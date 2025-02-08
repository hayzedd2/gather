"use client";
import React from "react";
import AnalyticsChart from "./AnalyticsChart";
import { useSingleFormAnalytics } from "@/hooks/useSingleFormAnalytics";
import MiniLoader from "./MiniLoader";
import ErrorMessage from "./ErrorMessage";

const FormAnalytics = ({ id }: { id: string }) => {
  const { data, isPending } = useSingleFormAnalytics(id);
  if (isPending) {
    return <MiniLoader/>;
  }
  if (!data) {
    return <ErrorMessage message="Sorry, no analytics found for this form."/>;
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
