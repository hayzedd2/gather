"use server";
import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { headers } from "next/headers";

export const getMyForms = async ({
  search,
}: {
  search?: string | undefined;
}) => {
  try {
    const sessions = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sessions) {
      return { error: "Unauthorized" };
    }

    const forms = await prismaDb.form.findMany({
      where: {
        userId: sessions.user.id,
        title: {
          contains: search,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        buttonText: true,
        viewCount: true,
        formConfig: true,
        updatedAt: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });
    return { forms };
  } catch (err) {
    return { error: "An unexpected error occured" };
  }
};
