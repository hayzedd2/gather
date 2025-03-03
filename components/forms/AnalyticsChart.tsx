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
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { useMemo } from "react";
import ErrorMessage from "../reusable-comps/ErrorMessage";

const chartConfig = {
  submissions: {
    label: "Submissions",
    color: "#000",
  },
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = parseISO(label);
    let dateDisplay;
    if (isToday(date)) {
      dateDisplay = `Today, ${format(date, "h:mm a")}`;
    } else if (isYesterday(date)) {
      dateDisplay = `Yesterday, ${format(date, "h:mm a")}`;
    } else {
      dateDisplay = format(date, "MMM d, yyyy h:mm a");
    }
    return (
      <div className="bg-background flex flex-col gap-1 py-2 px-4 rounded  border border-border">
        <p className="text-[14px] font-[500]">{dateDisplay}</p>
        <p className="text-[13px] text-muted-foreground font-[500]">
          Submissions: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};
export default function AnalyticsChart({
  totalSubmissions,
  countryData,
  dailySubmissions,
  viewCount,
}: SingleFormAnalyticsProps) {
  const aggregatedData = useMemo(() => {
    const maxAnalyticsData = 15
    const aggregated: { [key: string]: number } = {};
    dailySubmissions.forEach((item) => {
      const date = new Date(item.date);
      const key = format(date, "yyyy-MM-dd'T'HH:00:00.000'Z'");
      aggregated[key] = (aggregated[key] || 0) + item.count;
    });
    return Object.entries(aggregated).map(([date, count]) => ({ date, count }));
  }, [dailySubmissions]);

  const maxCount = Math.max(...aggregatedData.map((item) => item.count), 1);
  const yAxisTicks = [0, Math.ceil(maxCount / 2), maxCount];
  if (aggregatedData.length == 0) {
    return <ErrorMessage message="No data available." />;
  }
  return (
    <div>
      <div className="border rounded-lg  w-full">
        <div className="flex w-full dotted-down mb-4 overflow-x-scroll max-w-fit hide-scrollbar">
          <div className="flex py-3 min-w-[150px] shrink-0 px-5 flex-col dotted-right dotted">
            <h4 className="text-muted-foreground font-[500]">Submissions</h4>
            <h3 className="text-[1.5rem] font-[600]">{totalSubmissions}</h3>
          </div>
          <div className="flex py-3 min-w-[150px]  shrink-0 px-5 flex-col dotted-right dotted">
            <h4 className="text-muted-foreground font-[500]">Views </h4>
            <h3 className="text-[1.5rem] font-[600]">{viewCount}</h3>
          </div>
          <div className="flex py-3 min-w-[150px]  shrink-0 px-5 flex-col dotted-right dotted">
            <h4 className="text-muted-foreground font-[500]">
              Completion rate
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
                data={aggregatedData}
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
                  tickFormatter={(value) => {
                    const date = parseISO(value);
                    if (isToday(date)) return format(date, "h a");
                    if (isYesterday(date)) return "Yesterday";
                    return format(date, "MMM d");
                  }}
                  minTickGap={30}
                  tickMargin={15}
                  padding={{ left: 30, right: 30 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(value) => Math.round(value).toString()}
                  tickMargin={20}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip cursor={false} content={<CustomTooltip />} />
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
