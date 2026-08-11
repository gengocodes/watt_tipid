import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  accentBorderColor?: string;
}

export function MetricCard({
  title,
  value,
  subtext,
  accentBorderColor = "border-t-primary/30",
}: Readonly<MetricCardProps>) {
  return (
    <Card
      className={`overflow-hidden shadow-sm rounded-2xl border-t-2 ${accentBorderColor} transition-all duration-200 hover:shadow-md bg-card`}
    >
      <CardContent className="p-5 flex flex-col justify-between h-full gap-3">
        <span className="text-xs font-bold text-muted-foreground/70 uppercase tracking-wider">
          {title}
        </span>

        <div className="space-y-1">
          <div className="text-3xl font-black tracking-tight text-foreground">
            {value}
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            {subtext}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
