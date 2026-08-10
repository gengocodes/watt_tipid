"use client";

interface AnalysisStatusBadgeProps {
  status?: string;
}

export function AnalysisStatusBadge({
  status,
}: Readonly<AnalysisStatusBadgeProps>) {
  if (status === "EFFICIENT") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-3 py-0.5 text-xs font-medium">
        Efficient
      </span>
    );
  }

  if (status === "HAS_RECOMMENDATIONS") {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 px-3 py-0.5 text-xs font-medium">
        Has Tips
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-muted/60 text-muted-foreground border border-border/80 px-3 py-0.5 text-xs font-medium">
      Not Analyzed
    </span>
  );
}
