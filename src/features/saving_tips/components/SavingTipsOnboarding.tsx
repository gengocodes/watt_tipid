"use client";

import { MINIMUM_APPLIANCES_FOR_TIPS } from "../constants/constants";

interface SavingTipsOnboardingProps {
  activeCount: number;
}

export function SavingTipsOnboarding({
  activeCount,
}: Readonly<SavingTipsOnboardingProps>) {
  const remaining = Math.max(0, MINIMUM_APPLIANCES_FOR_TIPS - activeCount);
  const progressPct = Math.min(
    (activeCount / MINIMUM_APPLIANCES_FOR_TIPS) * 100,
    100,
  );

  return (
    <div
      data-tour="savings-onboarding"
      className="relative overflow-hidden flex flex-col items-center justify-center text-center p-6 sm:p-10 rounded-3xl border border-dashed border-emerald-500/25 bg-card/60 backdrop-blur-xs shadow-xs my-6 space-y-5"
    >
      <div className="space-y-2 max-w-md px-2">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Unlock Personalized AI Tips
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Add at least{" "}
          <span className="font-semibold text-foreground">
            {MINIMUM_APPLIANCES_FOR_TIPS} active appliances
          </span>{" "}
          so Gorlock AI can evaluate your household ecosystem as a whole and
          generate custom energy-saving recommendations.
        </p>
      </div>

      <div className="w-full max-w-xs space-y-2 bg-muted/40 p-3.5 rounded-2xl border border-border/50">
        <div className="flex justify-end items-center text-xs font-medium">
          <span className="text-primary font-mono">
            {activeCount} / {MINIMUM_APPLIANCES_FOR_TIPS}
          </span>
        </div>
        <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-linear-to-r from-sidebar-primary/70 to-sidebar-primary h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="text-xxs text-center text-muted-foreground font-medium pt-0.5">
          <span>
            Add <strong className="text-foreground">{remaining} more</strong>{" "}
            appliance{remaining > 1 ? "s" : ""} to start analysis
          </span>
        </div>
      </div>
    </div>
  );
}
