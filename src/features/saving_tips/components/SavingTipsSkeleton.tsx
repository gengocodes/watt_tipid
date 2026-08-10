"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SavingTipsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-64 rounded-3xl w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-32 rounded-2xl w-full" />
        <Skeleton className="h-32 rounded-2xl w-full" />
        <Skeleton className="h-32 rounded-2xl w-full" />
      </div>
    </div>
  );
}
