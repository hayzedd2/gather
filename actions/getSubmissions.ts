"use server";

import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { FormField } from "@/types/type";
import { headers } from "next/headers";
import * as z from "zod";

const submissionsParamsSchema = z.object({
  skip: z.number().min(0).default(0),
  limit: z.number().min(1).max(100).default(10),
  id: z.string().min(1),
});
export const getSubmissions = async ({
  skip = 0,
  limit = 10,
  id,
}: z.infer<typeof submissionsParamsSchema>) => {
  try {
    const sessions = await auth.api.getSession({
      headers: await headers(),
    });
    const validatedParams = submissionsParamsSchema.safeParse({
      skip,
      limit,
      id,
    });
    if (!validatedParams.success) {
      return { error: "Invalid params" };
    }
    if (!sessions) {
      return { error: "Unauthorized" };
    }
    if (!id) {
      return { error: "Form id is required" };
    }
    const formDetails = await prismaDb.form.findUnique({
      where: { userId: sessions.user.id, id },
      select: {
        formConfig: true,
        submissions: {
          select: {
            data: true,
            createdAt: true,
          },
          take: limit,
          skip,
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });
    if (!formDetails) {
      return { error: "Form not found" };
    }
    const submissionsCount = formDetails._count.submissions;
    const labels = (formDetails.formConfig as unknown as FormField[]).map(
      (field) => field.label
    );
    const submissions = formDetails.submissions.map((submission: any) => {
      const submissionData: Record<string, string | string[]> = {};
      (formDetails.formConfig as unknown as FormField[]).forEach((field) => {
        const fieldValue = submission.data[field.id];
        if ("options" in field) {
          if (field.type === "checkbox-group") {
            const selectedOptions = (fieldValue || []).map((value: string) => {
              const option = field.options.find(
                (option) => option.value === value
              );
              return option ? option.label : value;
            });
            submissionData[field.label] =
              selectedOptions.length > 0 ? selectedOptions : [];
          } else {
            const option = field.options.find(
              (option) => option.value === fieldValue
            );
            submissionData[field.label] = option ? option.label : fieldValue;
          }
        } else {
          submissionData[field.label] = fieldValue;
        }
      });

      return {
        ...submissionData,
      };
    });
    const totalPages = Math.ceil(submissionsCount / limit);
    return { labels, submissionsCount, submissions, totalPages };
  } catch (err) {
    return { error: "An unexpecetd error occured" };
  }
};
