import { prismaDb } from "@/lib/db";

export const updateAnalytics = async (formId: string, country: string) => {
  const now = new Date();
  const today = new Date(now);
  today.setMinutes(0, 0, 0);
  try {
    const formAnalytics = await prismaDb.formAnalytics.upsert({
      where: { formId },
      update: {
        totalSubmissions: { increment: 1 },
      },
      create: {
        formId,
        totalSubmissions: 1,
      },
    });

    await prismaDb.countryData.upsert({
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

    await prismaDb.dailySubmissions.upsert({
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
  } catch (error) {
    console.error("Error in updateAnalytics:", error);
    throw error;
  }
};

// This code is actually beans
