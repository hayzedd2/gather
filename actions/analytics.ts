import { prismaDb } from "@/lib/db";

export const updateAnalytics = async (formId: string, country: string) => {
  const now = new Date();
  const today = new Date(now);
  today.setMinutes(0, 0, 0);

  await prismaDb.$transaction(async (tx) => {
    const formAnalytics = await tx.formAnalytics.upsert({
      where: { formId },
      update: {
        totalSubmissions: { increment: 1 },
      },
      create: {
        formId,
        totalSubmissions: 1,
      },
    });

    await tx.countryData.upsert({
      where: {
        formAnalyticsId_country: {
          formAnalyticsId: formAnalytics.id,
          country,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        formAnalyticsId: formAnalytics.id,
        country,
        count: 1,
      },
    });

    await tx.dailySubmissions.upsert({
      where: {
        formAnalyticsId_date: {
          formAnalyticsId: formAnalytics.id,
          date: today,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        formAnalyticsId: formAnalytics.id,
        date: today,
        count: 1,
      },
    });
  });
};

// i came up with a method i would only show the frontend the last 7 days analytics so if a form has only one analytics say feb 7 we calculate feb 7-7 we start from feb 0 they would all have o count as default
