"use client";

import Link from "next/link";
import { Lightbulb, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterTab } from "../types/types";

interface SavingTipsEmptyStateProps {
  totalTipsCount: number;
  activeTab: FilterTab;
}

export function SavingTipsEmptyState({
  totalTipsCount,
  activeTab,
}: Readonly<SavingTipsEmptyStateProps>) {
  const isGlobalEmpty = totalTipsCount === 0;

  const title = isGlobalEmpty
    ? "No Saving Tips Generated"
    : `No ${activeTab} saving tips found`;

  const description = isGlobalEmpty
    ? "Click 'Generate Tips' above to run an AI analysis on your active household appliances."
    : `There are currently no saving tips in the "${activeTab}" view.`;

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border bg-card/40 border-dashed my-8">
      <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
        <Lightbulb className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mt-1.5 mb-6 leading-relaxed">
        {description}
      </p>

      {isGlobalEmpty && (
        <Link href="/appliances">
          <Button className="rounded-xl gap-2 font-medium cursor-pointer">
            <PlusCircle className="h-4 w-4" />
            <span>Manage Appliances</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
