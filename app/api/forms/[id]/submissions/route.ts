import { updateAnalytics } from "@/actions/analytics";
import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { FormField } from "@/types/type";
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
        title: true,
        submissions: {
          select: {
            data: true,
            createdAt: true,
            unique_form_submission_id: true,
          },

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
      return Response.json({ message: "Form not found" }, { status: 404 });
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
        unique_form_submission_id: submission.unique_form_submission_id,
      };
    });
    const returnedPayload = {
      title: formDetails.title,
      labels,
      submissionsCount,
      submissions,
    };
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
    // const countryRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ip`);
    // const { country = "Unknown" } = await countryRes.json();
    const data = await req.json();
    await prismaDb.submission.create({
      data: {
        formId: id,
        data,
        country: "Nigeria",
      },
    });
    // await updateAnalytics(id, "Nigeria");
    return Response.json(
      { message: "Successfully submitted form" },
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

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const selectedIds = await req.json();
    if (
      !selectedIds ||
      !Array.isArray(selectedIds) ||
      selectedIds.length === 0
    ) {
      return Response.json(
        { message: "No submissions selected" },
        { status: 400 }
      );
    }
    const deletedSubmissions = await prismaDb.submission.deleteMany({
      where: {
        unique_form_submission_id: { in: selectedIds },
      },
    });

    return Response.json(
      {
        message: "response(s) deleted successfully",
        deletedCount: deletedSubmissions.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting submissions:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};
