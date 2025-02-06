"use server";
import { prismaDb } from "@/lib/db";

export const IncrementView = async (formId: string) => {
  try {
    const result = await prismaDb.$transaction(async (tx) => {
      const form = await tx.form.findUnique({
        where: { id: formId },
        select: { viewCount: true },
      });

      return tx.form.update({
        where: { id: formId },
        data: {
          viewCount: (form?.viewCount || 0) + 1,
        },
      });
    });

    return result;
  } catch (error) {
    console.error("Failed to increment view count:", error);
  }
};
