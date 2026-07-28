"use client";

import { ReactElement } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerificationCodeInputProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  disabled?: boolean;
  error?: string;
}

export const VerificationCodeInput = <
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  disabled,
  error,
}: VerificationCodeInputProps<TFieldValues>): ReactElement => {
  return (
    <div className="space-y-2">
      <div className="flex justify-center py-2">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <InputOTP maxLength={6} disabled={disabled} {...field}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="rounded-md border border-input size-12 text-lg font-semibold bg-background"
                />
                <InputOTPSlot
                  index={1}
                  className="rounded-md border border-input size-12 text-lg font-semibold bg-background"
                />
                <InputOTPSlot
                  index={2}
                  className="rounded-md border border-input size-12 text-lg font-semibold bg-background"
                />
                <InputOTPSlot
                  index={3}
                  className="rounded-md border border-input size-12 text-lg font-semibold bg-background"
                />
                <InputOTPSlot
                  index={4}
                  className="rounded-md border border-input size-12 text-lg font-semibold bg-background"
                />
                <InputOTPSlot
                  index={5}
                  className="rounded-md border border-input size-12 text-lg font-semibold bg-background"
                />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>
      {error && (
        <p className="text-xs font-medium text-destructive text-center">
          {error}
        </p>
      )}
    </div>
  );
};
