"use client";

interface AnalysisStatusBadgeProps {
  status?: string;
}

export function AnalysisStatusBadge({
  status,
}: Readonly<AnalysisStatusBadgeProps>) {
  if (status === "EFFICIENT") {
    return (
      <span className="inline-flex items-center rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold">
        Efficient
      </span>
    );
  }

  if (status === "HAS_RECOMMENDATIONS") {
    return (
      <span className="inline-flex items-center rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 px-2.5 py-0.5 text-xs font-semibold">
        Tips Available
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md bg-muted/60 text-muted-foreground border border-border/70 px-2.5 py-0.5 text-xs font-medium">
      Not Analyzed
    </span>
  );
}
