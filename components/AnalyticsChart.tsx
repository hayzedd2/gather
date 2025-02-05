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

export interface DailySubmissionsAnalyticsDataProps {
  date: string;
  count: number;
}

const chartData: DailySubmissionsAnalyticsDataProps[] = [
  { date: "2023-05-06", count: 2 },
  { date: "2023-05-07", count: 4 },
  { date: "2023-05-01", count: 5 },
  { date: "2023-05-02", count: 5 },
  { date: "2023-05-04", count: 2 },
  { date: "2023-05-05", count: 1 },
];

const chartConfig = {
  submissions: {
    label: "Submissions",
    color: "hsl(var(--chart-1))",
  },
};

export default function AnalyticsChart() {
  return (
    <div className="border rounded-lg  w-full">
      <div className="flex w-full dotted-down mb-4">
        <div className="flex py-3 min-w-[150px] px-5 flex-col dotted-right dotted">
          <h4 className="text-muted-foreground font-[500]">Submissions</h4>
          <h3 className="text-[1.5rem] font-[600]">22</h3>
        </div>
        <div className="flex py-3 min-w-[150px] px-5 flex-col dotted-right dotted">
          <h4 className="text-muted-foreground font-[500]">Views </h4>
          <h3 className="text-[1.5rem] font-[600]">27</h3>
        </div>
        <div className="flex py-3 min-w-[150px] px-5 flex-col dotted-right dotted">
          <h4 className="text-muted-foreground font-[500]">Conversion rate</h4>
          <h3 className="text-[1.5rem] font-[600]">56%</h3>
        </div>
      </div>
      <div className="max-h-[300px]">
        {" "}
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
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
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis tickMargin={20} tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
  );
}
