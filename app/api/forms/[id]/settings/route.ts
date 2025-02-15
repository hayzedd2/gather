import { getFormByTitle } from "@/actions/form";
import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { SingleFormSettingsSchema } from "@/schema";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

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
    const validData = SingleFormSettingsSchema.safeParse(reqBody);
    if (!validData.success) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }
    const { title, description, buttonCtaText } = validData.data;
    const buttonText = buttonCtaText?.trim() || "Submit";
    const existingForm = await getFormByTitle(title);
    if (existingForm && existingForm.id != id) {
      return Response.json(
        { message: "Form title already exists, please use a different one" },
        { status: 500 }
      );
    }
    const form = await prismaDb.form.update({
      where: {
        userId: sessions.user.id,
        id,
      },
      data: {
        title,
        lastEdited: new Date(),
        description,
        buttonText,
      },
    });
    if (!form) {
      return Response.json({ message: "Form does not exist" }, { status: 400 });
    }
    console.log("Form edited", form);
    return Response.json(form, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
