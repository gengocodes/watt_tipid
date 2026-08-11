"use client";

import {
  SavingTipsSummaryResponse,
  HouseholdAnalysisStatusResponse,
} from "../types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, RefreshCw, AlertCircle, Clock } from "lucide-react";
import { useCooldownTimer } from "../hooks/useCooldownTimer";
import { formatCurrency } from "../utils/saving_tips.utils";
import {
  HEADER_GRADIENT_STYLES,
  MINIMUM_APPLIANCES_FOR_TIPS,
  AI_ASSISTANT_NAME,
} from "../constants/constants";

interface SavingTipsSummaryHeaderProps {
  summary: SavingTipsSummaryResponse | undefined;
  isLoading: boolean;
  analysisStatus: HouseholdAnalysisStatusResponse | undefined;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function SavingTipsSummaryHeader({
  summary,
  isLoading,
  analysisStatus,
  onGenerate,
  isGenerating,
}: Readonly<SavingTipsSummaryHeaderProps>) {
  const timeRemaining = useCooldownTimer(
    analysisStatus?.next_allowed_analysis_at,
    analysisStatus?.is_cooldown_active,
  );

  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-3xl p-6 sm:p-8 shadow-md mb-6",
          HEADER_GRADIENT_STYLES,
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 bg-white/20" />
            <Skeleton className="h-10 w-36 bg-white/30" />
            <Skeleton className="h-4 w-64 bg-white/20" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-24 bg-white/20 rounded-xl" />
            <Skeleton className="h-16 w-24 bg-white/20 rounded-xl" />
            <Skeleton className="h-16 w-24 bg-white/20 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const potentialMonthly = summary?.total_potential_monthly_savings ?? 0;
  const potentialYearly = summary?.total_yearly_savings ?? 0;
  const totalTips = summary?.total_tips_count ?? 0;
  const easyWins = summary?.easy_wins_count ?? 0;
  const reductionPct = summary?.percentage_bill_reduction ?? 0;

  const isInProgress = analysisStatus?.session_status === "IN_PROGRESS";
  const isCooldown = Boolean(analysisStatus?.is_cooldown_active);
  const isOutdated = Boolean(analysisStatus?.is_household_outdated);
  const activeCount = analysisStatus?.active_appliance_count ?? 0;
  const canGenerate =
    activeCount >= MINIMUM_APPLIANCES_FOR_TIPS &&
    !isCooldown &&
    !isInProgress &&
    !isGenerating;

  const getGenerateButtonLabel = (): string => {
    if (isInProgress || isGenerating) {
      return "Analyzing Household...";
    }
    if (isOutdated) {
      return "Re-Analyze Household";
    }
    return "Generate Tips";
  };

  return (
    <div
      data-tour="savings-header"
      className={`relative overflow-hidden rounded-2xl ${HEADER_GRADIENT_STYLES} p-6 sm:p-8 shadow-lg mb-6`}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-200/80 tracking-wide uppercase">
              <span>Total Potential Monthly Savings</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-1.5 drop-shadow-xs">
              {formatCurrency(potentialMonthly)}
            </div>
            <div className="text-xs sm:text-sm text-emerald-100">
              That&apos;s {formatCurrency(potentialYearly)}/year if all tips are
              followed
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              onClick={onGenerate}
              disabled={!canGenerate}
              className="bg-[#00b067] hover:bg-[#009e5c] text-[#012b1c] font-bold px-5.5 py-2.5 rounded-2xl shadow-md gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
            >
              {isInProgress || isGenerating ? (
                <RefreshCw className="size-4 animate-spin text-emerald-950" />
              ) : (
                <Sparkles className="size-4 text-emerald-950" />
              )}
              <span>{getGenerateButtonLabel()}</span>
            </Button>

            {(isInProgress || isGenerating) && (
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-md">
                <RefreshCw className="size-3.5 animate-spin text-emerald-200" />
                <span>{AI_ASSISTANT_NAME} is generating tips...</span>
              </span>
            )}

            {isOutdated && !isInProgress && !isGenerating && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-md">
                <AlertCircle className="size-3.5 text-emerald-200" />
                <span>Appliance configuration changed</span>
              </span>
            )}

            {isCooldown && !isInProgress && !isGenerating && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-md">
                <Clock className="size-3.5 text-emerald-200" />
                <span>Cooldown: {timeRemaining || "24h 00m 00s"}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-emerald-500/30">
          <div className="flex-1 sm:flex-initial bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 min-w-24 text-center md:text-right">
            <div className="text-2xl sm:text-3xl font-black text-white leading-none">
              {totalTips}
            </div>
            <div className="text-xs text-emerald-100/80 font-medium mt-1">
              Total tips
            </div>
          </div>

          <div className="flex-1 sm:flex-initial bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 min-w-24 text-center md:text-right">
            <div className="text-2xl sm:text-3xl font-black text-white leading-none">
              {easyWins}
            </div>
            <div className="text-xs text-emerald-100/80 font-medium mt-1">
              Easy wins
            </div>
          </div>

          <div className="flex-1 sm:flex-initial bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 min-w-24 text-center md:text-right">
            <div className="text-2xl sm:text-3xl font-black text-white leading-none">
              {reductionPct}%
            </div>
            <div className="text-xs text-emerald-100/80 font-medium mt-1">
              Bill reduction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
