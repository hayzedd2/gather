"use server";
import { prismaDb } from "@/lib/db";

export const IncrementView = async (formId: string) => {
  try {
    return await prismaDb.form.update({
      where: { id: formId },
      data: {
        viewCount: { increment: 1 },
      },
    });
  } catch (error) {
    // console.error("Failed to increment view count:", error);
    return null;
  }
};
