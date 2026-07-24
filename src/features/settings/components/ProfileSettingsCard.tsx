"use client";

import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/features/authentication";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/shared/ui/FormInput";
import { FormSubmitButton } from "@/shared/ui/FormSubmitButton";
import { FormError } from "@/shared/ui/FormError";
import { getAxiosErrorMessage } from "@/shared/utils/error";
import { useProfileSettings } from "../hooks/useProfileSettings";
import {
  profileSchema,
  ProfileInput,
  emailSchema,
  EmailInput,
  passwordSchema,
  PasswordInput,
} from "../schemas/settings.schema";

export const ProfileSettingsCard: FC = (): ReactElement => {
  const { user } = useAuthStore();
  const {
    updateProfile,
    isUpdatingProfile,
    updateProfileError,
    updateEmail,
    isUpdatingEmail,
    updateEmailError,
    updatePassword,
    isUpdatingPassword,
    updatePasswordError,
  } = useProfileSettings();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
    },
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    reset: resetEmailForm,
    formState: { errors: emailErrors },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    values: {
      email: user?.email || "",
      currentPassword: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileInput) => {
    updateProfile({
      first_name: data.firstName,
      last_name: data.lastName,
    });
  };

  const onEmailSubmit = (data: EmailInput) => {
    updateEmail(
      {
        current_password: data.currentPassword,
        new_email: data.email,
      },
      {
        onSuccess: () => {
          resetEmailForm({ email: data.email, currentPassword: "" });
        },
      },
    );
  };

  const onPasswordSubmit = (data: PasswordInput) => {
    updatePassword(
      {
        current_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      },
      {
        onSuccess: () => {
          resetPasswordForm();
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Profile Details</CardTitle>
          <CardDescription>Modify your personal name settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitProfile(onProfileSubmit)}
            className="space-y-4"
          >
            <FormError message={getAxiosErrorMessage(updateProfileError)} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                id="firstName"
                type="text"
                label="First Name"
                placeholder="Juan"
                disabled={isUpdatingProfile}
                error={profileErrors.firstName?.message}
                {...registerProfile("firstName")}
              />

              <FormInput
                id="lastName"
                type="text"
                label="Last Name"
                placeholder="Dela Cruz"
                disabled={isUpdatingProfile}
                error={profileErrors.lastName?.message}
                {...registerProfile("lastName")}
              />
            </div>

            <div className="flex justify-end pt-2">
              <FormSubmitButton
                isLoading={isUpdatingProfile}
                loadingText="Saving..."
              >
                Save Profile
              </FormSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>
            Change your account email address. This requires password
            verification and will sign you out on other devices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitEmail(onEmailSubmit)}
            className="space-y-4"
          >
            <FormError message={getAxiosErrorMessage(updateEmailError)} />

            <FormInput
              id="email"
              type="email"
              label="New Email Address"
              placeholder="juandelacruz@email.com"
              disabled={isUpdatingEmail}
              error={emailErrors.email?.message}
              {...registerEmail("email")}
            />

            <FormInput
              id="emailCurrentPassword"
              type="password"
              label="Current Password"
              placeholder="••••••••"
              disabled={isUpdatingEmail}
              error={emailErrors.currentPassword?.message}
              {...registerEmail("currentPassword")}
            />

            <div className="flex justify-end pt-2">
              <FormSubmitButton
                isLoading={isUpdatingEmail}
                loadingText="Updating..."
              >
                Update Email
              </FormSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your account password. This requires password verification
            and will sign you out on other devices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitPassword(onPasswordSubmit)}
            className="space-y-4"
          >
            <FormError message={getAxiosErrorMessage(updatePasswordError)} />

            <FormInput
              id="passwordCurrentPassword"
              type="password"
              label="Current Password"
              placeholder="••••••••"
              disabled={isUpdatingPassword}
              error={passwordErrors.currentPassword?.message}
              {...registerPassword("currentPassword")}
            />

            <Separator className="my-2" />

            <FormInput
              id="newPassword"
              type="password"
              label="New Password"
              placeholder="••••••••"
              disabled={isUpdatingPassword}
              error={passwordErrors.newPassword?.message}
              {...registerPassword("newPassword")}
            />

            <FormInput
              id="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="••••••••"
              disabled={isUpdatingPassword}
              error={passwordErrors.confirmPassword?.message}
              {...registerPassword("confirmPassword")}
            />

            <div className="flex justify-end pt-2">
              <FormSubmitButton
                isLoading={isUpdatingPassword}
                loadingText="Updating..."
              >
                Change Password
              </FormSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
