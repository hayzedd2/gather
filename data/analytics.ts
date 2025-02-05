import { prismaDb } from "@/lib/db";

export const updateAnalytics = async (formId: string, country: string) => {
  const today = new Date().toISOString().split("T")[0];
  const currentAnalytics = await prismaDb.formAnalytics.findUnique({
    where: {
      formId,
    },
  });
  if (!currentAnalytics) {
    return await prismaDb.formAnalytics.create({
      data: {
        formId,
        totalSubmissions: 1,
        countryCounts: [{ country, count: 1 }],
        dailySubmissions: [{ date: today, count: 1 }],
      },
    });
  }

  const countryData = [...(currentAnalytics.countryCounts as any[])];
  const countryIndex = countryData.findIndex((item) => item.country == country);
  if (countryIndex >= 0) {
    countryData[countryIndex].count += 1;
  } else {
    countryData.push({ country, count: 1 });
  }

  const dailySubmissions = [...(currentAnalytics.dailySubmissions as any[])];
  const todayIndex = dailySubmissions.findIndex((item) => item.date == today);
  if (todayIndex >= 0) {
    dailySubmissions[todayIndex].count += 1;
  } else {
    dailySubmissions.push({ date: today, count: 1 });
  }
  return await prismaDb.formAnalytics.update({
    where: {
      formId,
    },
    data: {
      totalSubmissions: currentAnalytics.totalSubmissions + 1,
      countryCounts: countryData,
      dailySubmissions,
    },
  });
};
