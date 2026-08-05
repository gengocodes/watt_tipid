import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export function MetricCard({
  title,
  value,
  subtext,
  icon,
  iconBgColor,
  iconColor,
}: Readonly<MetricCardProps>) {
  return (
    <Card className="overflow-hidden shadow-sm rounded-3xl transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              {title}
            </span>
            <span className="text-3xl font-black tracking-tight text-foreground">
              {value}
            </span>
            <span className="text-xs font-medium text-muted-foreground leading-none">
              {subtext}
            </span>
          </div>

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgColor} ${iconColor} transition-transform duration-300 hover:scale-105 shadow-inner`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
