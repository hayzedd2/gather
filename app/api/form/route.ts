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
    const buttonText = buttonCtaText?.trim() || "Submit";
    const form = await prismaDb.form.create({
      data: {
        userId: sessions.user.id,
        title,
        description,
        buttonText,
        formConfig: fields,
      },
    });
    console.log(form);
    return Response.json(form, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};
