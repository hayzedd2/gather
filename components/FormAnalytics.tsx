"use client";
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useSingleFormAnalytics } from "@/hooks/useSingleFormAnalytics";

const FormAnalytics = ({ id }: { id: string }) => {
  const { data, isPending } = useSingleFormAnalytics(id);
  if (isPending) {
    return <>Loading...</>;
  }
  if (!data) {
    return <>Empty</>;
  }
  return (
    <div>
      <AnalyticsChart
        viewCount={data.viewCount}
        countryData={data.countryData}
        dailySubmissions={data.dailySubmissions}
        totalSubmissions={data.totalSubmissions}
      />
    </div>
  );
};

export default FormAnalytics;
