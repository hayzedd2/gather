import { prismaDb } from "@/lib/db";

export const getFormByTitle = async (title: string) => {
  try {
    const form = await prismaDb.form.findUnique({
      where: {
        title,
      },
    });
    return form
  } catch {
    return null;
  }
};
