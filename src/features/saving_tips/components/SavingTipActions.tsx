"use client";

import { Check, X } from "lucide-react";
import { SavingTipStatus } from "../types/types";
import { cn } from "@/lib/utils";

interface SavingTipActionsProps {
  tipId: string;
  isCompleted: boolean;
  isStale: boolean;
  isUpdating: boolean;
  onUpdateStatus: (
    id: string,
    status: Exclude<SavingTipStatus, "stale">,
  ) => void;
}

export function SavingTipActions({
  tipId,
  isCompleted,
  isStale,
  isUpdating,
  onUpdateStatus,
}: Readonly<SavingTipActionsProps>) {
  return (
    <div className="flex items-center gap-2 shrink-0 self-start w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
      {!isStale && (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() =>
            onUpdateStatus(tipId, isCompleted ? "active" : "completed")
          }
          className={cn(
            "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer",
            isCompleted
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-muted/50 hover:bg-muted border-border text-foreground shadow-xs",
          )}
        >
          <Check className="h-3.5 w-3.5" />
          <span>{isCompleted ? "Completed" : "Mark Done"}</span>
        </button>
      )}

      <button
        type="button"
        disabled={isUpdating}
        onClick={() => onUpdateStatus(tipId, "deleted")}
        title="Remove tip card"
        className="p-1.5 rounded-full text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
