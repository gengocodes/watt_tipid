"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ApplianceForm } from "./ApplianceForm";
import { ApplianceInput, CATEGORIES } from "../schemas/appliance.schema";
import { ApplianceResponse } from "../types/types";

interface EditApplianceCardProps {
  appliance: ApplianceResponse;
  electricityRate: number;
  onSubmit: (data: ApplianceInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EditApplianceCard({
  appliance,
  electricityRate,
  onSubmit,
  onCancel,
  isLoading = false,
}: Readonly<EditApplianceCardProps>) {
  const [liveKwh, setLiveKwh] = useState(appliance.monthly_kwh);

  const handleValuesChange = (values: { wattage: number; hours: number }) => {
    const kwh = (values.wattage * values.hours * 30) / 1000;
    setLiveKwh(kwh);
  };

  const estimatedCost = liveKwh * electricityRate;

  return (
    <Card className="border-border rounded-2xl mb-6 shadow-sm">
      <CardHeader className="p-5 sm:p-6 pb-0 sm:pb-0 space-y-1">
        <CardTitle className="text-base sm:text-lg font-bold tracking-tight">
          Edit Appliance
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Modify appliance usage profiles. Estimates recalculate immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 pt-4 sm:pt-4 space-y-4">
        <ApplianceForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultValues={{
            name: appliance.name,
            category: appliance.category as (typeof CATEGORIES)[number],
            wattage_watts: appliance.wattage_watts,
            daily_usage_hours: appliance.daily_usage_hours,
            icon: appliance.icon,
          }}
          submitLabel="Save Changes"
          isLoading={isLoading}
          onValuesChange={handleValuesChange}
        />

        <div className="flex items-center gap-2 rounded-xl bg-sidebar-primary-foreground px-4 py-3 text-sm text-primary">
          <Zap className="h-4 w-4" />
          <span className="tracking-wide">
            Monthly:{" "}
            <span className="font-semibold">{liveKwh.toFixed(1)} kWh</span> ≈{" "}
            <span className="font-semibold">
              {estimatedCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
