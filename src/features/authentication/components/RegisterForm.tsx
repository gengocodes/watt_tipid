"use client";

import { FC, ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterInput,
} from "@/features/authentication/schemas/auth.schema";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { FormError } from "@/shared/ui/FormError";
import { FormInput } from "@/shared/ui/FormInput";
import { FormSubmitButton } from "@/shared/ui/FormSubmitButton";
import { PhilippineLocationSelect } from "@/shared/ui/PhilippineLocationSelect";
import { getAxiosErrorMessage } from "@/shared/utils/error";

export const RegisterForm: FC = (): ReactElement => {
  const { register: registerUser, isRegistering, registerError } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      barangayCity: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterInput): void => {
    registerUser(data);
  };

  const errorMessage = getAxiosErrorMessage(registerError);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError message={errorMessage} />

      <FormInput
        id="firstName"
        type="text"
        label="First Name"
        placeholder="Juan"
        disabled={isRegistering}
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      <FormInput
        id="lastName"
        type="text"
        label="Last Name"
        placeholder="Dela Cruz"
        disabled={isRegistering}
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <Controller
        name="barangayCity"
        control={control}
        render={({ field }) => (
          <PhilippineLocationSelect
            onChange={field.onChange}
            disabled={isRegistering}
            error={errors.barangayCity?.message}
          />
        )}
      />

      <FormInput
        id="email"
        type="email"
        label="Email Address"
        placeholder="juandelacruz@email.com"
        disabled={isRegistering}
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        disabled={isRegistering}
        error={errors.password?.message}
        {...register("password")}
      />

      <FormSubmitButton
        isLoading={isRegistering}
        loadingText="Creating account..."
      >
        Create Account
      </FormSubmitButton>
    </form>
  );
};
