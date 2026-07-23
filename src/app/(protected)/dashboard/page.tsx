"use client";

import { useAuth } from "@/features/authentication";
import { useDashboardSummary } from "@/features/energy";
import { MetricCard } from "@/features/energy/components/MetricCard";
import { EnergySavingScoreGauge } from "@/features/energy/components/EnergySavingScoreGauge";
import { ConsumptionTrendChart } from "@/features/energy/components/ConsumptionTrendChart";
import { CategoryPieChart } from "@/features/energy/components/CategoryPieChart";
import { BillHistoryChart } from "@/features/energy/components/BillHistoryChart";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";
import { ErrorScreen } from "@/shared/ui/ErrorScreen";
import { DollarSign, Zap, Cpu } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { summary, isLoading, error } = useDashboardSummary();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getCurrentMonthYear = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !summary) {
    return <ErrorScreen title="Error loading dashboard summary" />;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">
          {getGreeting()}, {user?.first_name || "Juan"}!
        </h1>
        <p className="text-sm font-semibold text-muted-foreground">
          Here&apos;s your energy summary for {getCurrentMonthYear()}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Estimated Monthly Cost"
          value={`₱${summary.estimated_monthly_cost.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`}
          subtext={`Based on ₱${summary.electricity_rate_php_kwh.toFixed(2)}/kWh`}
          icon={<DollarSign className="h-6 w-6" />}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <MetricCard
          title="Current Month Projection"
          value={`${summary.total_monthly_kwh.toFixed(0)} kWh`}
          subtext="Calculated monthly estimate"
          icon={<Zap className="h-6 w-6" />}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />

        <MetricCard
          title="Active Appliances"
          value={summary.appliance_count}
          subtext="Across all categories"
          icon={<Cpu className="h-6 w-6" />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConsumptionTrendChart data={summary.monthly_trend} />
        </div>
        <div>
          <EnergySavingScoreGauge
            score={summary.energy_saving_score}
            status={summary.score_status}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <CategoryPieChart data={summary.category_shares} />
        </div>
        <div>
          <BillHistoryChart data={summary.monthly_trend} />
        </div>
      </div>
    </div>
  );
}
