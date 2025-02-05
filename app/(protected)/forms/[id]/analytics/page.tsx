import AnalyticsChart from "@/components/AnalyticsChart";
import CountryAnalytics from "@/components/CountryAnalytics";
import { generateShareableLink } from "@/helpers/generateShareableLink";
import { ExternalLink } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="py-6 px-3">
      <div className="header mb-3 flex flex-col">
        <h2 className=" text-[1.5rem] font-[500]">Form Analytics</h2>
        <a
          href={generateShareableLink("hello")}
          className="underline flex items-center underline-offset-2 text-regular text-[14px] "
        >
          {generateShareableLink("hello")}
          <span><ExternalLink size={14} /></span>
        </a>
      </div>
      <AnalyticsChart />
      {/* <CountryAnalytics /> */}
    </div>
  );
};

export default page;
