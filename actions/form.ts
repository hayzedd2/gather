import { prismaDb } from "@/lib/db";

export const getFormByTitle = async (userId: string, title: string) => {
  return prismaDb.form.findUnique({
    where: {
      userId_title: { userId, title },
    },
  });
};

