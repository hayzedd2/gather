import { prismaDb } from "@/lib/db";

export const updateAnalytics = async (formId: string, country: string) => {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

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


    // Find or create country data entry
    const existingCountryData = await prismaDb.countryData.findFirst({
      where: {
        formAnalyticsId: formAnalytics.id,
        country,
      },
    });

    if (existingCountryData) {
      await prismaDb.countryData.update({
        where: { id: existingCountryData.id },
        data: { count: { increment: 1 } },
      });
    } else {
      await prismaDb.countryData.create({
        data: {
          formAnalyticsId: formAnalytics.id,
          country,
          count: 1,
        },
      });
    }

    // Find or create daily submission entry
    const existingDailySubmission = await prismaDb.dailySubmissions.findFirst({
      where: {
        formAnalyticsId: formAnalytics.id,
        date: today,
      },
    });

    if (existingDailySubmission) {
      await prismaDb.dailySubmissions.update({
        where: { id: existingDailySubmission.id },
        data: { count: { increment: 1 } },
      });
    } else {
      await prismaDb.dailySubmissions.create({
        data: {
          formAnalyticsId: formAnalytics.id,
          date: today,
          count: 1,
        },
      });
    }

    return formAnalytics;
  } catch (error) {
    console.error("Error in updateAnalytics:", error);
    throw error;
  }
};


// this code is actually beans