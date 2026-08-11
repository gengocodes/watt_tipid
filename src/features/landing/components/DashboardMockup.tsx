import { FC, ReactElement } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Zap } from "lucide-react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "D", kwh: 120, fill: "var(--chart-1)" },
  { month: "J", kwh: 155, fill: "var(--chart-1)" },
  { month: "F", kwh: 180, fill: "var(--chart-2)" },
  { month: "M", kwh: 160, fill: "var(--chart-1)" },
  { month: "A", kwh: 195, fill: "var(--chart-2)" },
  { month: "M", kwh: 202, fill: "var(--chart-2)" },
  { month: "J", kwh: 205, fill: "var(--chart-4)" },
];

const chartConfig = {
  kwh: {
    label: "Consumption (kWh)",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export const DashboardMockup: FC = (): ReactElement => {
  return (
    <div className="bg-background rounded-3xl border border-primary/10 p-6 shadow-2xl shadow-primary/20 w-full max-w-xl z-10 relative">
      <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground/50">
            JUNE 2026
          </p>
          <h3 className="text-lg font-semibold text-foreground">
            Monthly Overview
          </h3>
        </div>
        <Badge
          variant="outline"
          className="h-auto gap-2 px-3 py-1 rounded-full bg-chart-1/20 text-xs text-primary border-primary/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-chart-2 animate-pulse" />{" "}
          Live
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-5">
        <div className="bg-[#eef7ee] border border-emerald-100/60 p-4 rounded-2xl">
          <p className="text-xs text-emerald-700 font-semibold">Est. Bill</p>
          <p className="text-xl font-extrabold text-emerald-950 mt-1">₱2,460</p>
          <p className="text-xxs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-emerald-600" />
            <span>8% vs last month</span>
          </p>
        </div>

        <div className="bg-[#fff8e7] border border-amber-100/60 p-4 rounded-2xl">
          <p className="text-xs text-amber-700 font-semibold">Consumption</p>
          <p className="text-xl font-extrabold text-amber-950 mt-1">205 kWh</p>
          <p className="text-xxs text-amber-700 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-600" />
            <span>3 kWh from May</span>
          </p>
        </div>

        <div className="bg-[#eaf3ff] border border-sky-100/60 p-4 rounded-2xl">
          <p className="text-xs text-sky-700 font-semibold">Score</p>
          <p className="text-xl font-extrabold text-sky-950 mt-1">78 / 100</p>
          <p className="text-xxs text-sky-600 font-medium mt-1">
            Excellent standing
          </p>
        </div>

        <div className="bg-[#f5eafd] border border-purple-100/60 p-4 rounded-2xl">
          <p className="text-xs text-purple-700 font-semibold">Appliances</p>
          <p className="text-xl font-extrabold text-purple-950 mt-1">
            6 tracked
          </p>
          <p className="text-xxs text-purple-600 font-medium mt-1">
            Cooling is #1 driver
          </p>
        </div>
      </div>

      <div className="bg-muted/50 border border-muted p-4 rounded-2xl">
        <p className="text-xs font-medium text-muted-foreground/70 mb-2">
          7-MONTH TREND (kWh)
        </p>
        <ChartContainer config={chartConfig} className="h-28 w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
              className="text-xxxs font-bold text-zinc-400"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="line" />}
            />
            <Bar dataKey="kwh" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ChartContainer>
      </div>

      <div
        className="absolute -left-5 md:-left-10 bottom-6 bg-background border border-muted rounded-2xl p-3.5 shadow-xl flex items-center gap-3 max-w-60 z-20 animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        <div className="h-9 w-9 rounded-full bg-chart-1/20 border border-chart-1/50 flex items-center justify-center shrink-0">
          <Zap className="h-4.5 w-4.5 text-emerald-600 fill-emerald-600/20" />
        </div>
        <div>
          <p className="text-xxxs font-extrabold text-emerald-700 uppercase tracking-wider">
            AI Tip
          </p>
          <p className="text-xs text-muted-foreground/70 font-medium mt-0.5 leading-snug">
            Raise AC to 26°C to save{" "}
            <span className="text-emerald-700 font-bold">₱456/mo</span>
          </p>
        </div>
      </div>
    </div>
  );
};
