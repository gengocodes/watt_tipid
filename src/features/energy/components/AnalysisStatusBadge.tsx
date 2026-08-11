"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AnalysisStatusBadgeProps {
  status?: string;
}

export function AnalysisStatusBadge({
  status,
}: Readonly<AnalysisStatusBadgeProps>) {
  if (status === "EFFICIENT") {
    return (
      <span className="text-xs font-normal text-muted-foreground">Optimal</span>
    );
  }

  if (status === "HAS_RECOMMENDATIONS") {
    return (
      <Link
        href="/savings-tips"
        className="inline-flex items-center gap-0.5 text-xs font-medium text-foreground hover:text-foreground/80 underline underline-offset-2 cursor-pointer group"
        title="View savings tips for this appliance"
      >
        <span>View Tip</span>
        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    );
  }

  return (
    <span className="text-xs font-normal text-muted-foreground/60">
      Pending
    </span>
  );
}
