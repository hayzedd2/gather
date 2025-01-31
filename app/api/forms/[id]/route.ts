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
    console.log(form)
    return Response.json(form, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
