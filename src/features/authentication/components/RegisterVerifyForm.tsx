"use client";

import { FC, ReactElement, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/auth.store";
import { FormError } from "@/shared/ui/FormError";
import { FormSubmitButton } from "@/shared/ui/FormSubmitButton";
import { getAxiosErrorMessage } from "@/shared/utils/error";
import { MoveLeft } from "lucide-react";
import { VerificationCodeInput } from "@/shared/ui/VerificationCodeInput";

const verifySchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits"),
});

type VerifyInput = z.infer<typeof verifySchema>;

export const RegisterVerifyForm: FC = (): ReactElement => {
  const {
    verifyRegister,
    isVerifyingRegister,
    verifyRegisterError,
    resendRegisterCode,
    isResendingRegisterCode,
    resendRegisterCodeError,
  } = useAuth();

  const { registeredEmail, setAuthView } = useAuthStore();
  const [cooldown, setCooldown] = useState(60);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyInput>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  // Handle resend cooldown timer
  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const onSubmit = (data: VerifyInput): void => {
    verifyRegister({
      email: registeredEmail,
      code: data.code,
    });
  };

  const handleResend = (): void => {
    if (cooldown > 0 || isResendingRegisterCode) return;
    resendRegisterCode(registeredEmail, {
      onSuccess: () => {
        setCooldown(60);
      },
    });
  };

  const errorMessage = getAxiosErrorMessage(
    verifyRegisterError || resendRegisterCodeError,
  );

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        We sent a 6-digit verification code to{" "}
        <span className="font-semibold text-foreground">{registeredEmail}</span>
        . Please enter the code to verify your email and activate your account.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormError message={errorMessage} />

        <VerificationCodeInput
          control={control}
          name="code"
          disabled={isVerifyingRegister}
          error={errors.code?.message}
        />

        <FormSubmitButton
          isLoading={isVerifyingRegister}
          loadingText="Verifying account..."
        >
          Verify &amp; Create Account
        </FormSubmitButton>
      </form>

      <div className="flex items-center justify-between gap-4 pt-2 text-xs">
        <button
          type="button"
          onClick={() => setAuthView("register")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-none bg-transparent p-0"
        >
          <MoveLeft className="h-3 w-3" />
          Back to registration
        </button>

        <button
          type="button"
          disabled={cooldown > 0 || isResendingRegisterCode}
          onClick={handleResend}
          className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline font-medium transition-colors cursor-pointer border-none bg-transparent p-0"
        >
          {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
        </button>
      </div>
    </div>
  );
};
