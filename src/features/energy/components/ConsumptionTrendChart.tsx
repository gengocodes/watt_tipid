import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { MonthlyTrendItem } from "../types/types";
import { formatMonth } from "@/shared/utils/date";

// TODO: creation a migration script to dummify a user's consumption trend data
interface ConsumptionTrendChartProps {
  data: MonthlyTrendItem[];
}

export function ConsumptionTrendChart({
  data,
}: Readonly<ConsumptionTrendChartProps>) {
  const hasData = data && data.length > 0;

  return (
    <Card className="shadow-sm rounded-2xl h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground/60 uppercase tracking-wider">
          Monthly Consumption Trend
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground/60 font-medium">
          kWh usage over time
        </CardDescription>
      </CardHeader>

      <CardContent className="h-64 p-6 pt-0 flex-1 flex items-center justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground/60 gap-2 h-full w-full">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
              No History Available
            </span>
            <span className="text-xxs text-center max-w-50 text-muted-foreground/60 leading-snug">
              Projections start logging when months close, or as you record
              consumption patterns.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonth}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                }}
                labelStyle={{
                  fontWeight: 600,
                  color: "#1e293b",
                  fontSize: "12px",
                }}
                itemStyle={{
                  color: "#10b981",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
                formatter={(value) => [`${value} kWh`, "Energy"]}
                labelFormatter={(label) => `Month: ${formatMonth(label)}`}
              />
              <Area
                type="monotone"
                dataKey="kwh"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorKwh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
