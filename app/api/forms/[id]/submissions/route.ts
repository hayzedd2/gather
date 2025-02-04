import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { FormFieldT } from "@/types/type";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const sessions = await auth.api.getSession({ headers: await headers() });
    if (!sessions) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).id;
    if (!id) {
      return Response.json({ message: "Form ID is required" }, { status: 400 });
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
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });
    if (!formDetails) {
      return Response.json({ message: "Form not found" }, { status: 404 });
    }
    const submissionsCount = formDetails._count.submissions;
    const labels = (formDetails.formConfig as unknown as FormFieldT[]).map(
      (field) => field.label
    );
    const submissions = formDetails.submissions.map((submission: any) => {
      const submissionData: Record<string, string | string[]> = {};
      (formDetails.formConfig as unknown as FormFieldT[]).forEach((field) => {
        const fieldValue = submission.data[field.id];
        if ("options" in field) {
          const option = field.options.find(
            (option) => option.value === fieldValue
          );
          submissionData[field.label] = option ? option.label : fieldValue;
        } else {
          submissionData[field.label] = fieldValue;
        }
      });

      return {
        ...submissionData,
      };
    });
    const returnedPayload = {
      labels,
      submissionsCount,
      submissions,
    };
    console.log(returnedPayload);
    return Response.json(returnedPayload, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;
    if (!id) {
      return Response.json({ message: "Form ID is required" }, { status: 400 });
    }
    const reqBody = await req.json();
    console.log(reqBody);
    const data = await prismaDb.submission.create({
      data: {
        formId: id,
        data: reqBody,
      },
    });
    console.log(data);
    return Response.json(
      { message: "succesfully submitted form" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in form submission:", error);
    return Response.json(
      { message: "An error occurred, please try again" },
      { status: 500 }
    );
  }
};
