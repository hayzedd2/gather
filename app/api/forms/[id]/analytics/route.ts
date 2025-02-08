import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const sessions = await auth.api.getSession({ headers: await headers() });
    if (!sessions) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).id;
    if (!id) {
      return Response.json({ message: "Form ID is required" }, { status: 400 });
    }

    const analytics = await prismaDb.formAnalytics.findUnique({
      where: { formId: id },
      select: {
        totalSubmissions: true,
        form: {
          select: {
            viewCount: true,
          },
        },
        
        CountryData: {
          select: {
            country: true,
            count: true,
          },
        },
        DailySubmissions: {
          select: {
            date: true,
            count: true,
          },
          orderBy:{
            date:"asc"
          }
        },
      },
      
    });
    if (!analytics) {
      return Response.json(
        { message: "No analytics was found for this form" },
        { status: 404 }
      );
    }
    return Response.json(
      {
        totalSubmissions: analytics.totalSubmissions,
        countryData: analytics.CountryData,
        dailySubmissions: analytics.DailySubmissions,
        viewCount: analytics.form.viewCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error fetching analytics" },
      { status: 500 }
    );
  }
};
