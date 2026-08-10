"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applianceSchema,
  ApplianceInput,
  CATEGORIES,
} from "../schemas/appliance.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ICONS_CONFIG } from "../constants/constants";

interface ApplianceFormProps {
  onSubmit: (data: ApplianceInput) => void;
  onCancel: () => void;
  defaultValues?: Partial<ApplianceInput>;
  submitLabel?: string;
  isLoading?: boolean;
  onValuesChange?: (values: { wattage: number; hours: number }) => void;
}

export function ApplianceForm({
  onSubmit,
  onCancel,
  defaultValues,
  submitLabel = "Save Changes",
  isLoading = false,
  onValuesChange,
}: Readonly<ApplianceFormProps>) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ApplianceInput>({
    resolver: zodResolver(applianceSchema),
    defaultValues: {
      name: "",
      category: "Cooling",
      wattage_watts: 0,
      daily_usage_hours: 0,
      icon: "plug",
      ...defaultValues,
    },
  });

  // Watch fields for live preview calculation
  const wattage = useWatch({ control, name: "wattage_watts" });
  const hours = useWatch({ control, name: "daily_usage_hours" });
  const selectedIcon = useWatch({ control, name: "icon" });
  const selectedCategory = useWatch({ control, name: "category" });

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange({
        wattage: Number(wattage) || 0,
        hours: Number(hours) || 0,
      });
    }
  }, [wattage, hours, onValuesChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label
            htmlFor="name"
            className="text-xs font-medium text-muted-foreground tracking-wider"
          >
            Appliance Name
          </Label>
          <Input
            id="name"
            placeholder="e.g. Air Conditioner"
            {...register("name")}
            className="rounded-lg"
          />
          {errors.name && (
            <p className="text-xs text-destructive font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground tracking-wider">
            Category
          </Label>
          <input type="hidden" {...register("category")} />
          <Select
            value={selectedCategory}
            onValueChange={(val) =>
              setValue("category", val as (typeof CATEGORIES)[number], {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger className="w-full rounded-lg">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-xs text-destructive font-medium">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="wattage"
            className="text-xs font-medium text-muted-foreground tracking-wider"
          >
            Wattage (W)
          </Label>
          <Input
            id="wattage"
            type="number"
            placeholder="e.g. 1500"
            {...register("wattage_watts", { valueAsNumber: true })}
            className="rounded-lg"
          />
          {errors.wattage_watts && (
            <p className="text-xs text-destructive font-medium">
              {errors.wattage_watts.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="hours"
            className="text-xs font-medium text-muted-foreground tracking-wider"
          >
            Daily Usage (hrs/day)
          </Label>
          <Input
            id="hours"
            type="number"
            step="any"
            placeholder="e.g. 8"
            {...register("daily_usage_hours", { valueAsNumber: true })}
            className="rounded-lg"
          />
          {errors.daily_usage_hours && (
            <p className="text-xs text-destructive font-medium">
              {errors.daily_usage_hours.message}
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Select Appliance Icon
          </Label>
          <input type="hidden" {...register("icon")} />
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {ICONS_CONFIG.map((item) => {
              const IconComp = item.icon;
              const isSelected = selectedIcon === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setValue("icon", item.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer gap-2 ${
                    isSelected
                      ? item.activeClass
                      : "border-muted hover:border-muted-foreground hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <IconComp className="h-6 w-6" />
                  <span className="text-xxs font-medium tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.icon && (
            <p className="text-xs text-destructive font-medium">
              {errors.icon.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
