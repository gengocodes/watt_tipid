"use client";

import { FC, ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserSettings } from "@/features/energy";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FormInput } from "@/shared/ui/FormInput";
import { FormSubmitButton } from "@/shared/ui/FormSubmitButton";
import { FormError } from "@/shared/ui/FormError";
import { getAxiosErrorMessage } from "@/shared/utils/error";
import { toast } from "react-toastify";
import {
  electricityRateSchema,
  ElectricityRateInput,
} from "../schemas/settings.schema";

export const ElectricityRateCard: FC = (): ReactElement => {
  const { settings, updateSettings, isUpdating, updateError } =
    useUserSettings();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ElectricityRateInput>({
    resolver: zodResolver(electricityRateSchema),
    defaultValues: {
      electricityRatePhpKwh: settings?.electricity_rate_php_kwh || 0,
    },
  });

  useEffect(() => {
    if (settings) {
      setValue("electricityRatePhpKwh", settings.electricity_rate_php_kwh);
    }
  }, [settings, setValue]);

  const onSubmit = (data: ElectricityRateInput) => {
    updateSettings(
      { electricity_rate_php_kwh: data.electricityRatePhpKwh },
      {
        onSuccess: () => {
          toast.success("Electricity rate updated successfully!");
        },
      },
    );
  };

  const errorMessage = getAxiosErrorMessage(updateError);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Electricity Rate</CardTitle>
        <CardDescription>
          Adjust your electricity rate per kilowatt-hour (kWh) in Philippine
          Pesos (PHP).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormError message={errorMessage} />

          <FormInput
            id="electricityRatePhpKwh"
            type="number"
            step="0.01"
            label="Rate (PHP/kWh)"
            placeholder="e.g. 12.50"
            disabled={isUpdating}
            error={errors.electricityRatePhpKwh?.message}
            {...register("electricityRatePhpKwh", { valueAsNumber: true })}
          />

          <div className="flex justify-end pt-2">
            <FormSubmitButton isLoading={isUpdating} loadingText="Saving...">
              Save Rate
            </FormSubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
