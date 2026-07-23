import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { CategoryShare } from "../types/types";
import { CATEGORY_COLORS } from "../constants/constants";

interface CategoryPieChartProps {
  data: CategoryShare[];
}

export function CategoryPieChart({ data }: Readonly<CategoryPieChartProps>) {
  const hasData = data && data.length > 0;

  const chartData = React.useMemo(() => {
    return data.map((entry) => ({
      ...entry,
      fill: CATEGORY_COLORS[entry.category] ?? CATEGORY_COLORS.Other,
    }));
  }, [data]);

  return (
    <Card className="shadow-sm rounded-2xl h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground/60 uppercase tracking-wider">
          Consumption by Category
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground/60 font-medium">
          % share of monthly kWh
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex-1 flex flex-col md:flex-row items-center justify-around gap-6">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground/60 gap-2 h-44 w-full">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
              No Appliances Added
            </span>
            <span className="text-xxs text-center max-w-50 text-muted-foreground/60 leading-snug">
              Add appliances in the Appliance Manager page to view category
              breakdowns.
            </span>
          </div>
        ) : (
          <>
            <div className="h-44 w-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #f1f5f9",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                    }}
                    itemStyle={{ fontSize: "12px", fontWeight: 500 }}
                    formatter={(value) => [`${value} kWh`, "Usage"]}
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="kwh"
                    nameKey="category"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2.5 w-full max-w-50">
              {data.map((entry) => {
                const color =
                  CATEGORY_COLORS[entry.category] ?? CATEGORY_COLORS.Other;
                return (
                  <div
                    key={entry.category}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-md shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs font-semibold text-muted-foreground/80">
                        {entry.category}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground/60">
                      {entry.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
