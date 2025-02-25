import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sessions = await auth.api.getSession({ headers: await headers() });
    if (!sessions) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).id;
    if (!id) {
      return Response.json({ message: "Form ID is required" }, { status: 400 });
    }
    const form = await prismaDb.form.findUnique({
      where: {
        userId: sessions.user.id,
        id,
      },
      include: {
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });
    if (!form) {
      return Response.json({ message: "Form does not exist" }, { status: 400 });
    }
    return Response.json(form, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sessions = await auth.api.getSession({ headers: await headers() });
    if (!sessions) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).id;
    if (!id) {
      return Response.json({ message: "Form ID is required" }, { status: 400 });
    }
    const reqBody = await req.json();
    const { fields, title, description, buttonCtaText, successMessage } =
      reqBody;
    if (!fields || !title || !description) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }
    const buttonText = buttonCtaText?.trim() || "Submit";
    const successMsg = successMessage?.trim() || "Form submitted succesfully";
    const form = await prismaDb.form.update({
      where: {
        userId: sessions.user.id,
        id,
      },
      data: {
        title,
        successMessage:successMsg,
        lastEdited: new Date(),
        description,
        buttonText,
        formConfig: fields,
      },
    });
    if (!form) {
      return Response.json({ message: "Form does not exist" }, { status: 400 });
    }
    return Response.json(form, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sessions = await auth.api.getSession({ headers: await headers() });
    if (!sessions) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).id;
    if (!id) {
      return Response.json({ message: "Form ID is required" }, { status: 400 });
    }

    const form = await prismaDb.form.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!form) {
      return Response.json({ message: "Form not found" }, { status: 404 });
    }
    if (form.userId !== sessions.user.id) {
      return Response.json({ message: "Unauthorized" }, { status: 403 });
    }

    await prismaDb.$transaction([
      prismaDb.dailySubmissions.deleteMany({
        where: { formAnalytics: { formId: id } },
      }),
      prismaDb.countryData.deleteMany({
        where: { formAnalytics: { formId: id } },
      }),
      prismaDb.formAnalytics.deleteMany({ where: { formId: id } }),
      prismaDb.submission.deleteMany({ where: { formId: id } }),
      prismaDb.form.delete({ where: { id } }),
    ]);
    return Response.json({ message: "Form deleted succesfully", status: 200 });
  } catch (err) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
