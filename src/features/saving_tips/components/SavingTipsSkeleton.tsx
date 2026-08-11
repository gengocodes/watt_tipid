"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { HEADER_GRADIENT_STYLES } from "../constants/constants";

export function SavingTipsSkeleton() {
  return (
    <div className="space-y-6">
      <div
        className={`rounded-3xl p-6 sm:p-8 shadow-md ${HEADER_GRADIENT_STYLES}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 bg-white/20" />
            <Skeleton className="h-10 w-36 bg-white/30" />
            <Skeleton className="h-4 w-64 bg-white/20" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-24 bg-white/20 rounded-xl" />
            <Skeleton className="h-16 w-24 bg-white/20 rounded-xl" />
            <Skeleton className="h-16 w-24 bg-white/20 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-9 w-24 rounded-xl" />
        <Skeleton className="h-9 w-24 rounded-xl" />
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs"
          >
            <Skeleton className="size-11 rounded-2xl shrink-0" />

            <div className="flex-1 space-y-3 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <Skeleton className="h-5 w-48 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <div className="flex items-center gap-4 pt-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-start pt-2 sm:pt-0">
              <Skeleton className="h-9 w-28 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
