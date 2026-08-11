"use client";

import { useEffect, useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MonthlyTrendItem } from "../types/types";
import {
  monthlyTrendSchema,
  MonthlyTrendFormValues,
} from "../schemas/monthly_trend.schema";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { formatMonthWithYear, getLocalYearMonth } from "@/shared/utils/date";

interface AddMonthlyTrendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: MonthlyTrendItem | null;
}

export function AddMonthlyTrendDialog({
  open,
  onOpenChange,
  initialData,
}: Readonly<AddMonthlyTrendDialogProps>) {
  const {
    summary,
    logMonthlyTrend,
    isLoggingTrend,
    deleteMonthlyTrend,
    isDeletingTrend,
  } = useDashboardSummary();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentYearMonth = getLocalYearMonth();
  const existingTrends = useMemo(
    () => summary?.monthly_trend || [],
    [summary?.monthly_trend],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<
    z.input<typeof monthlyTrendSchema>,
    unknown,
    MonthlyTrendFormValues
  >({
    resolver: zodResolver(monthlyTrendSchema),
    defaultValues: {
      month: initialData?.month || currentYearMonth,
      kwh: initialData?.kwh || undefined,
      cost_php: initialData?.cost || undefined,
    },
  });

  const selectedMonth = useWatch({ control, name: "month" });

  // Check if currently selected month has existing recorded data
  const existingRecord = useMemo(() => {
    return existingTrends.find((item) => item.month === selectedMonth);
  }, [existingTrends, selectedMonth]);

  const isEditing = Boolean(existingRecord);

  const getSubmitButtonText = () => {
    if (isLoggingTrend) return "Saving...";
    if (isEditing) return "Save Changes";
    return "Record Entry";
  };

  // Sync form values when dialog opens or initialData changes
  useEffect(() => {
    if (open) {
      const activeMonth = initialData?.month || currentYearMonth;
      const matchingRecord = existingTrends.find(
        (item) => item.month === activeMonth,
      );

      reset({
        month: activeMonth,
        kwh: matchingRecord?.kwh || initialData?.kwh || undefined,
        cost_php: matchingRecord?.cost || initialData?.cost || undefined,
      });
    }
  }, [open, initialData, currentYearMonth, existingTrends, reset]);

  // Handle month picker input change
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value;
    setValue("month", newMonth);
    const matching = existingTrends.find((item) => item.month === newMonth);
    setValue("kwh", matching?.kwh || (undefined as unknown as number));
    setValue("cost_php", matching?.cost || undefined);
  };

  const onSubmit = async (values: MonthlyTrendFormValues) => {
    try {
      setSubmitError(null);
      await logMonthlyTrend({
        month: values.month,
        kwh: values.kwh,
        cost_php: values.cost_php,
      });
      onOpenChange(false);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const responseData = (
          err as { response?: { data?: { detail?: string } } }
        ).response?.data;
        setSubmitError(
          responseData?.detail || "Failed to save monthly trend record.",
        );
      } else {
        setSubmitError("Failed to save monthly trend record.");
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedMonth || !isEditing) return;
    try {
      setSubmitError(null);
      await deleteMonthlyTrend(selectedMonth);
      onOpenChange(false);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const responseData = (
          err as { response?: { data?: { detail?: string } } }
        ).response?.data;
        setSubmitError(responseData?.detail || "Failed to delete record.");
      } else {
        setSubmitError("Failed to delete record.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-bold text-foreground">
            {isEditing
              ? `Edit ${formatMonthWithYear(selectedMonth)} Record`
              : `Record ${formatMonthWithYear(selectedMonth)} Usage`}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {isEditing
              ? "Modify or delete recorded consumption and bill data."
              : "Enter monthly kWh usage and estimated bill cost."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {submitError && (
            <div className="p-3 text-xs font-medium text-destructive bg-destructive/10 rounded-xl">
              {submitError}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="month" className="text-xs font-semibold">
              Month & Year
            </Label>
            <Input
              id="month"
              type="month"
              max={currentYearMonth}
              value={selectedMonth || currentYearMonth}
              onChange={handleMonthChange}
              className="rounded-xl text-xs"
            />
            {errors.month && (
              <p className="text-xxs font-medium text-destructive">
                {errors.month.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="kwh" className="text-xs font-semibold">
              Monthly Consumption (kWh)
            </Label>
            <Input
              id="kwh"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="e.g. 150.5"
              className="rounded-xl text-xs"
              {...register("kwh")}
            />
            {errors.kwh && (
              <p className="text-xxs font-medium text-destructive">
                {errors.kwh.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cost_php" className="text-xs font-semibold">
              Total Bill Cost in PHP (Optional)
            </Label>
            <Input
              id="cost_php"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Leave blank to auto-calculate with current rate"
              className="rounded-xl text-xs"
              {...register("cost_php")}
            />
            {errors.cost_php && (
              <p className="text-xxs font-medium text-destructive">
                {errors.cost_php.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4 flex items-center justify-between gap-2">
            {isEditing ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-xl text-xs"
                onClick={handleDelete}
                disabled={isDeletingTrend || isLoggingTrend}
              >
                {isDeletingTrend ? "Deleting..." : "Delete"}
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl text-xs"
                onClick={() => onOpenChange(false)}
                disabled={isLoggingTrend || isDeletingTrend}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="rounded-xl text-xs"
                disabled={isLoggingTrend || isDeletingTrend}
              >
                {getSubmitButtonText()}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
