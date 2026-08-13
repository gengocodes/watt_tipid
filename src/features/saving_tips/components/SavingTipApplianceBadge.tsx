"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface SavingTipApplianceBadgeProps {
  applianceName: string;
  isOutdated?: boolean;
  isStale?: boolean;
}

export function SavingTipApplianceBadge({
  applianceName,
  isOutdated,
  isStale,
}: Readonly<SavingTipApplianceBadgeProps>) {
  if (isStale) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
        <AlertTriangle className="h-3 w-3" />
        <span>{applianceName} (Deleted)</span>
      </span>
    );
  }

  if (isOutdated) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30">
        <RefreshCw className="h-3 w-3" />
        <span>{applianceName} (Reconfigured)</span>
      </span>
    );
  }

  return (
    <span className="text-xs font-medium px-3 py-0.5 rounded-full bg-muted text-muted-foreground">
      {applianceName}
    </span>
  );
}
