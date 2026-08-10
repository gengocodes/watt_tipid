"use client";

import { SavingTipPriority } from "../types/types";
import {
  PRIORITY_LABELS,
  PRIORITY_BADGE_STYLES,
} from "../constants/constants";
import { cn } from "@/lib/utils";

interface SavingTipPriorityBadgeProps {
  priority: SavingTipPriority;
}

export function SavingTipPriorityBadge({
  priority,
}: Readonly<SavingTipPriorityBadgeProps>) {
  const priorityBadgeStyles = PRIORITY_BADGE_STYLES[priority];
  const priorityLabel = PRIORITY_LABELS[priority];
  return (
    <span
      className={cn(
        "text-xs font-medium px-3 py-0.5 rounded-full",
        priorityBadgeStyles,
      )}
    >
      {priorityLabel}
    </span>
  );
}
