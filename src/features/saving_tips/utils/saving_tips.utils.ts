import { SavingTipResponse, FilterTab } from "../types/types";
import {
  DEFAULT_ELECTRICITY_RATE,
  DEFAULT_REDUCTION_HOURS,
} from "../constants/constants";

export interface TipBreakdown {
  wattage: number;
  currentHours: number;
  currentMonthlyKwh: number;
  reductionHours: number;
  newHours: number;
  newMonthlyKwh: number;
  monthlyKwhSaved: number;
  estimatedSavings: number;
  impliedRate: string;
}

export interface TipCounts {
  all: number;
  active: number;
  completed: number;
  stale: number;
}

export function calculateTipBreakdown(tip: SavingTipResponse): TipBreakdown {
  const wattage = tip.appliance_wattage_watts || 0;
  const currentHours = tip.appliance_daily_usage_hours || 0;
  const currentMonthlyKwh =
    tip.appliance_monthly_kwh || (wattage * currentHours * 30) / 1000;
  const reductionHours =
    tip.recommended_daily_usage_reduction_hours || DEFAULT_REDUCTION_HOURS;
  const newHours = Math.max(0, currentHours - reductionHours);
  const newMonthlyKwh = (wattage * newHours * 30) / 1000;
  const monthlyKwhSaved = (wattage * reductionHours * 30) / 1000;
  const estimatedSavings = tip.estimated_monthly_savings || 0;

  const impliedRate =
    monthlyKwhSaved > 0
      ? (estimatedSavings / monthlyKwhSaved).toFixed(2)
      : DEFAULT_ELECTRICITY_RATE;

  return {
    wattage,
    currentHours,
    currentMonthlyKwh,
    reductionHours,
    newHours,
    newMonthlyKwh,
    monthlyKwhSaved,
    estimatedSavings,
    impliedRate,
  };
}

export function computeTipCounts(tips: SavingTipResponse[]): TipCounts {
  return {
    all: tips.length,
    active: tips.filter((t) => t.status === "active").length,
    completed: tips.filter((t) => t.status === "completed").length,
    stale: tips.filter((t) => t.status === "stale").length,
  };
}

export function filterTips(
  tips: SavingTipResponse[],
  activeTab: FilterTab,
): SavingTipResponse[] {
  if (activeTab === "all") return tips;
  return tips.filter((tip) => tip.status === activeTab);
}

export function formatCurrency(amount: number): string {
  return `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatDate(dateString: string | null): string | null {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
