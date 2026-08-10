import { SavingTipPriority, SavingTipEffort, FilterTab } from "../types/types";

export const MINIMUM_APPLIANCES_FOR_TIPS = 5;
export const DEFAULT_ELECTRICITY_RATE = "12.50";
export const DEFAULT_REDUCTION_HOURS = 1.0;
export const AI_ASSISTANT_NAME = "Gorlock";

export const SAVING_TIPS_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Tips" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "stale", label: "Appliance Deleted" },
];

export const PRIORITY_LABELS: Record<SavingTipPriority, string> = {
  HIGH: "High Priority",
  MEDIUM: "Medium Priority",
  LOW: "Low Priority",
};

export const EFFORT_LABELS: Record<SavingTipEffort, string> = {
  LOW: "Easy",
  MEDIUM: "Moderate",
  HIGH: "Hard",
};

export const PRIORITY_AVATAR_STYLES: Record<SavingTipPriority, string> = {
  HIGH: "bg-rose-100 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400",
  MEDIUM:
    "bg-amber-100 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400",
  LOW: "bg-emerald-100 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400",
};

export const PRIORITY_BADGE_STYLES: Record<SavingTipPriority, string> = {
  HIGH: "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50",
  MEDIUM:
    "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50",
  LOW: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50",
};

export const HEADER_GRADIENT_STYLES =
  "bg-linear-to-br from-[#1b5e20] via-[#1e6624] to-[#154d1a] text-white";

export const FILTER_TAB_ACTIVE_STYLES =
  "bg-linear-to-br from-[#1b5e20] via-[#1e6624] to-[#154d1a] text-primary-foreground shadow-xs";
