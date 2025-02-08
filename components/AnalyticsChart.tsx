"use client";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SingleFormAnalyticsProps } from "@/types/type";
import CountryAnalytics from "./CountryAnalytics";

const chartConfig = {
  submissions: {
    label: "Submissions",
    color: "#000",
  },
};

export default function AnalyticsChart({
  totalSubmissions,
  countryData,
  dailySubmissions,
  viewCount,
}: SingleFormAnalyticsProps) {
  return (
    <div>
      <div className="border rounded-lg  w-full">
        <div className="flex w-full dotted-down mb-4">
          <div className="flex py-3 min-w-[150px] px-5 flex-col dotted-right dotted">
            <h4 className="text-muted-foreground font-[500]">Submissions</h4>
            <h3 className="text-[1.5rem] font-[600]">{totalSubmissions}</h3>
          </div>
          <div className="flex py-3 min-w-[150px] px-5 flex-col dotted-right dotted">
            <h4 className="text-muted-foreground font-[500]">Views </h4>
            <h3 className="text-[1.5rem] font-[600]">{viewCount}</h3>
          </div>
          <div className="flex py-3 min-w-[150px] px-5 flex-col dotted-right dotted">
            <h4 className="text-muted-foreground font-[500]">
              Conversion rate
            </h4>
            <h3 className="text-[1.5rem] text-regular font-[600]">
              {Math.floor((totalSubmissions / viewCount) * 100)}%
            </h3>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailySubmissions}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 30, right: 30 }}
                  tickMargin={15}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })
                      .format(date)
                      .replace(/^0/, "");
                  }}
                />
                <YAxis
                  tickCount={3}
                  tickMargin={20}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-submissions)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
      <CountryAnalytics
        data={countryData}
        totalSubmissions={totalSubmissions}
      />
    </div>
  );
}
