"use client";

import Link from "next/link";
import { useAuth } from "@/features/authentication";
import { useDashboardSummary } from "@/features/energy";
import { MetricCard } from "@/features/energy/components/MetricCard";
import { EnergySavingScoreGauge } from "@/features/energy/components/EnergySavingScoreGauge";
import { ConsumptionTrendChart } from "@/features/energy/components/ConsumptionTrendChart";
import { CategoryPieChart } from "@/features/energy/components/CategoryPieChart";
import { BillHistoryChart } from "@/features/energy/components/BillHistoryChart";
import { AiInsightsBanner } from "@/features/energy/components/AiInsightsBanner";
import { DashboardSkeleton } from "@/features/energy/components/DashboardSkeleton";
import { ErrorScreen } from "@/shared/ui/ErrorScreen";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";

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
    return <DashboardSkeleton />;
  }

  if (error || !summary) {
    return <ErrorScreen title="Error loading dashboard summary" />;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            {getGreeting()}, {user?.first_name || "Juan"}!
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Here&apos;s your household energy overview and smart bill
            projections for{" "}
            <span className="font-bold">{getCurrentMonthYear()}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/chat">
            <Button
              variant="outline"
              className="gap-2 rounded-2xl font-semibold text-xs shadow-sm"
            >
              <Sparkles className="size-4 text-primary" />
              <span>Ask Gorlock</span>
            </Button>
          </Link>
          <Link href="/appliances">
            <Button className="gap-2 rounded-2xl font-semibold text-xs shadow-sm">
              <Plus className="size-4" />
              <span>Add Appliance</span>
            </Button>
          </Link>
        </div>
      </div>

      <AiInsightsBanner summary={summary} />

      <div data-tour="dashboard-stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Estimated Monthly Cost"
          value={`₱${summary.estimated_monthly_cost.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`}
          subtext={`Based on ₱${summary.electricity_rate_php_kwh.toFixed(2)}/kWh rate`}
          accentBorderColor="border-t-emerald-500"
        />

        <MetricCard
          title="Current Month Projection"
          value={`${summary.total_monthly_kwh.toFixed(0)} kWh`}
          subtext="Calculated monthly estimate"
          accentBorderColor="border-t-amber-500"
        />

        <MetricCard
          title="Active Appliances"
          value={summary.appliance_count}
          subtext="Across all categories"
          accentBorderColor="border-t-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConsumptionTrendChart data={summary.monthly_trend} />
        </div>
        <div data-tour="dashboard-score">
          <EnergySavingScoreGauge
            score={summary.energy_saving_score}
            status={summary.score_status}
          />
        </div>
      </div>

      <div data-tour="dashboard-chart" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
