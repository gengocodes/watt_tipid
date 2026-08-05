"use client";

import Link from "next/link";
import { ArrowRight, Bot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EnergySummaryResponse } from "../types/types";
import { CATEGORY_TEXT_CLASSES } from "../constants/constants";

interface AiInsightsBannerProps {
  summary: EnergySummaryResponse;
}

export function AiInsightsBanner({ summary }: Readonly<AiInsightsBannerProps>) {
  const isZeroAppliances = summary.appliance_count === 0;

  const topCategory =
    summary.category_shares.length > 0
      ? [...summary.category_shares].sort((a, b) => b.kwh - a.kwh)[0]
      : null;

  const topCategoryTextClass = topCategory
    ? (CATEGORY_TEXT_CLASSES[topCategory.category] ??
      CATEGORY_TEXT_CLASSES.Other)
    : CATEGORY_TEXT_CLASSES.Other;

  const renderInsightText = () => {
    if (isZeroAppliances || !topCategory || topCategory.kwh === 0) {
      return (
        <span>
          Let&apos;s set up your home appliances! Add your appliances to unlock
          real-time monthly cost estimates, category breakdowns, and AI saving
          recommendations.
        </span>
      );
    }

    if (topCategory.percentage >= 40) {
      return (
        <span>
          Your{" "}
          <span
            className={cn("font-black tracking-tight", topCategoryTextClass)}
          >
            {topCategory.category}
          </span>{" "}
          appliances account for {topCategory.percentage.toFixed(0)}% of your
          estimated monthly energy consumption. Chat with Gorlock to optimize
          run hours!
        </span>
      );
    }

    return (
      <span>
        Your energy saving score is {summary.energy_saving_score}/100 (
        {summary.score_status}). Ask Gorlock for custom tips to lower your
        monthly ₱{summary.estimated_monthly_cost.toLocaleString()} bill!
      </span>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-r from-primary/10 to-background p-6 md:p-8 shadow-sm transition-all hover:border-primary/30">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4 max-w-3xl">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Bot className="size-6" />
          </div>

          <h2 className="text-base md:text-lg font-bold tracking-tight text-foreground/90 leading-relaxed">
            {renderInsightText()}
          </h2>
        </div>

        {isZeroAppliances ? (
          <Link href="/appliances" className="shrink-0 w-full md:w-auto">
            <Button className="w-full md:w-auto gap-2 rounded-2xl px-6 py-6 font-bold shadow-md hover:shadow-lg transition-all text-sm">
              <Plus className="size-4" />
              <span>Add First Appliance</span>
            </Button>
          </Link>
        ) : (
          <Link href="/chat" className="shrink-0 w-full md:w-auto">
            <Button className="w-full md:w-auto gap-2 rounded-2xl px-6 py-6 font-bold shadow-md hover:shadow-lg transition-all text-sm">
              <span>Chat with Gorlock</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
