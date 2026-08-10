"use client";

import { SavingTipResponse } from "../types/types";
import {
  ExternalLink,
  TrendingDown,
  Info,
  Calendar,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency } from "../utils/saving_tips.utils";

interface SavingTipMetadataProps {
  tip: SavingTipResponse;
  formattedDateStr: string | null;
  effortLabel: string;
  onOpenBreakdown: () => void;
}

export function SavingTipMetadata({
  tip,
  formattedDateStr,
  effortLabel,
  onOpenBreakdown,
}: Readonly<SavingTipMetadataProps>) {
  const isCalculated = tip.tip_type === "CALCULATED";

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
      {isCalculated && tip.estimated_monthly_savings !== null && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button
                type="button"
                onClick={onOpenBreakdown}
                className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1 rounded-lg transition-colors border border-emerald-500/20 active:scale-95"
              >
                <TrendingDown className="h-4 w-4" />
                <span>
                  Save {formatCurrency(tip.estimated_monthly_savings)}/month
                </span>
                <HelpCircle className="h-3.5 w-3.5 opacity-70 ml-0.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs px-2.5 py-1">
              Click to view calculation breakdown
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {tip.source_url && (
        <a
          href={tip.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Source: {tip.source_name || "Official Reference"}</span>
        </a>
      )}

      <div className="flex items-center gap-1 text-muted-foreground">
        <Info className="h-3.5 w-3.5 text-muted-foreground/70" />
        <span>Effort: {effortLabel}</span>
      </div>

      {formattedDateStr && (
        <div className="flex items-center gap-1 text-muted-foreground/60">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDateStr}</span>
        </div>
      )}
    </div>
  );
}
