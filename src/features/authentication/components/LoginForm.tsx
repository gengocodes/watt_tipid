"use client";

import { FC, ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginInput,
} from "@/features/authentication/schemas/auth.schema";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { useAuthStore } from "@/features/authentication/store/auth.store";
import { FormError } from "@/shared/ui/FormError";
import { FormInput } from "@/shared/ui/FormInput";
import { FormSubmitButton } from "@/shared/ui/FormSubmitButton";
import { getAxiosErrorMessage } from "@/shared/utils/error";

export const LoginForm: FC = (): ReactElement => {
  const { login, isLoggingIn, loginError } = useAuth();
  const { registeredEmail, clearRegisteredEmail } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: registeredEmail || "",
      password: "",
    },
  });

  useEffect(() => {
    if (registeredEmail) {
      setValue("email", registeredEmail);
      clearRegisteredEmail();
    }
  }, [registeredEmail, setValue, clearRegisteredEmail]);

  const onSubmit = (data: LoginInput): void => {
    login(data);
  };

  const errorMessage = getAxiosErrorMessage(loginError);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError message={errorMessage} />

      <FormInput
        id="email"
        type="email"
        label="Email address"
        placeholder="juandelacruz@email.com"
        disabled={isLoggingIn}
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••••"
        disabled={isLoggingIn}
        error={errors.password?.message}
        {...register("password")}
      />

      <FormSubmitButton isLoading={isLoggingIn} loadingText="Logging in...">
        Log In
      </FormSubmitButton>
    </form>
  );
};
