"use client";

import { useState } from "react";
import { SavingTipResponse, SavingTipStatus } from "../types/types";
import { CalculationBreakdownDialog } from "./CalculationBreakdownDialog";
import { SavingTipAvatar } from "./SavingTipAvatar";
import { SavingTipPriorityBadge } from "./SavingTipPriorityBadge";
import { SavingTipApplianceBadge } from "./SavingTipApplianceBadge";
import { SavingTipMetadata } from "./SavingTipMetadata";
import { SavingTipActions } from "./SavingTipActions";
import { EFFORT_LABELS } from "../constants/constants";
import { formatDate } from "../utils/saving_tips.utils";
import { cn } from "@/lib/utils";

interface SavingTipCardProps {
  tip: SavingTipResponse;
  onUpdateStatus: (
    id: string,
    status: Exclude<SavingTipStatus, "stale">,
  ) => void;
  isUpdating: boolean;
}

export function SavingTipCard({
  tip,
  onUpdateStatus,
  isUpdating,
}: Readonly<SavingTipCardProps>) {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const isCompleted = tip.status === "completed";
  const isStale = tip.status === "stale";
  const isCalculated = tip.tip_type === "CALCULATED";

  const formattedDateStr = formatDate(tip.generated_at);
  const effortLabel = EFFORT_LABELS[tip.effort_level];

  const getCardContainerStyle = (): string => {
    if (isCompleted) {
      return "bg-muted/30 opacity-75 border-muted";
    }
    if (isStale) {
      return "bg-amber-500/5 border-amber-500/30";
    }
    return "bg-card border-border hover:border-primary/40 hover:shadow-md";
  };

  return (
    <>
      <div
        data-tour="savings-tip-card"
        className={cn(
          "group relative flex flex-col sm:flex-row items-start gap-4 rounded-2xl border p-5 sm:p-6 shadow-xs transition-all duration-200",
          getCardContainerStyle(),
        )}
      >
        <SavingTipAvatar priority={tip.priority} />

        <div className="flex-1 min-w-0 pr-0 sm:pr-2">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3
              className={cn(
                "font-bold text-base text-foreground tracking-tight",
                isCompleted && "line-through text-muted-foreground",
              )}
            >
              {tip.title}
            </h3>

            <SavingTipPriorityBadge priority={tip.priority} />
            <SavingTipApplianceBadge
              applianceName={tip.appliance_name}
              isStale={isStale}
            />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {tip.description}
          </p>

          <SavingTipMetadata
            tip={tip}
            formattedDateStr={formattedDateStr}
            effortLabel={effortLabel}
            onOpenBreakdown={() => setIsBreakdownOpen(true)}
          />
        </div>

        <SavingTipActions
          tipId={tip.id}
          isCompleted={isCompleted}
          isStale={isStale}
          isUpdating={isUpdating}
          onUpdateStatus={onUpdateStatus}
        />
      </div>

      {isCalculated && (
        <CalculationBreakdownDialog
          open={isBreakdownOpen}
          onOpenChange={setIsBreakdownOpen}
          tip={tip}
        />
      )}
    </>
  );
}
