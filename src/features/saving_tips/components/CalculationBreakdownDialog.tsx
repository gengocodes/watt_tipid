"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SavingTipResponse } from "../types/types";
import {
  calculateTipBreakdown,
  formatCurrency,
} from "../utils/saving_tips.utils";

interface CalculationBreakdownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tip: SavingTipResponse;
}

export function CalculationBreakdownDialog({
  open,
  onOpenChange,
  tip,
}: Readonly<CalculationBreakdownDialogProps>) {
  const {
    wattage,
    currentHours,
    currentMonthlyKwh,
    reductionHours,
    newHours,
    newMonthlyKwh,
    monthlyKwhSaved,
    estimatedSavings,
    impliedRate,
  } = calculateTipBreakdown(tip);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] sm:max-w-lg md:max-w-xl rounded-2xl p-5 space-y-4 border border-border bg-card shadow-xl">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            Savings Breakdown
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Detailed estimation of your energy and cost reduction based on usage
            adjustments.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xs">
          <div className="p-4 bg-muted/30 border-b border-border/80 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Appliance
              </span>
              <div className="text-base font-bold text-foreground truncate">
                {tip.appliance_name}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  ({wattage}W)
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Est. Monthly Savings
              </span>
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(estimatedSavings)}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  / mo
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider pb-1.5 border-b border-border/60">
              <div>Metric</div>
              <div className="text-center">Current</div>
              <div className="text-right">Recommended</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs items-center py-1">
              <span className="font-medium text-foreground">Daily Usage</span>
              <span className="text-center text-muted-foreground">
                {currentHours} hrs/day
              </span>
              <span className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
                {newHours} hrs/day{" "}
                <span className="text-[10px] font-normal text-emerald-600/80">
                  (-{reductionHours}h)
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs items-center py-1.5 border-t border-border/40">
              <span className="font-medium text-foreground">
                Monthly Energy
              </span>
              <span className="text-center text-muted-foreground">
                {currentMonthlyKwh.toFixed(1)} kWh
              </span>
              <span className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
                {newMonthlyKwh.toFixed(1)} kWh{" "}
                <span className="text-[10px] font-normal text-emerald-600/80">
                  (-{monthlyKwhSaved.toFixed(1)} kWh)
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs items-center pt-2 border-t border-border/60">
              <span className="font-medium text-foreground">
                Electricity Rate
              </span>
              <span className="text-center text-muted-foreground">
                ₱{impliedRate} / kWh
              </span>
              <span className="text-right font-bold text-emerald-600 dark:text-emerald-400">
                Save {formatCurrency(estimatedSavings)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-1">
          <DialogClose
            render={
              <Button className="w-full font-medium rounded-xl cursor-pointer">
                Got It
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
