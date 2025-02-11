import { getFormByTitle } from "@/actions/form";
import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const sessions = await auth.api.getSession({ headers: await headers() });
    if (!sessions) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await req.json();
    const { fields, title, description, buttonCtaText } = reqBody;
    if (!fields || !title || !description) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }
    const formExistsByTitle = await getFormByTitle(title);
    if (formExistsByTitle) {
      return Response.json(
        { message: "Form title already exists, please use a different one" },
        { status: 500 }
      );
    }
    const buttonText = buttonCtaText?.trim() || "Submit";
    const createdForm = await prismaDb.form.create({
      data: {
        userId: sessions.user.id,
        title,
        description,
        buttonText,
        formConfig: fields,
      },
    });
    return Response.json(createdForm, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const sessions = await auth.api.getSession({ headers: await headers() });
    if (!sessions) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formsWithSubmissionCounts = await prismaDb.form.findMany({
      where: { userId: sessions.user.id },
      orderBy: {
        lastEdited: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        buttonText: true,
        viewCount: true,
        lastEdited: true,
        formConfig: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });

    return Response.json(formsWithSubmissionCounts, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};
