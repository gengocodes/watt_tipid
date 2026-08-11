"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-44 rounded-md" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-32 rounded-xl" />
          <Skeleton className="h-9 w-36 rounded-xl" />
        </div>
      </div>

      <Skeleton className="h-28 w-full rounded-2xl" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 rounded-2xl w-full" />
        <Skeleton className="h-32 rounded-2xl w-full" />
        <Skeleton className="h-32 rounded-2xl w-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-80 rounded-2xl w-full" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-80 rounded-2xl w-full" />
        </div>
      </div>

      <Skeleton className="h-80 rounded-2xl w-full" />
    </div>
  );
}
