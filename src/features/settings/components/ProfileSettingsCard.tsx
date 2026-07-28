"use client";

import { FC, ReactElement, useState, useEffect } from "react";
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
  VerifyEmailChangeInput,
  verifyEmailChangeSchema,
} from "../schemas/settings.schema";
import { VerificationCodeInput } from "@/shared/ui/VerificationCodeInput";

export const ProfileSettingsCard: FC = (): ReactElement => {
  const { user } = useAuthStore();
  const {
    updateProfile,
    isUpdatingProfile,
    updateProfileError,
    updateEmail,
    isUpdatingEmail,
    updateEmailError,
    verifyEmail,
    isVerifyingEmail,
    verifyEmailError,
    resendEmailCode,
    isResendingEmailCode,
    resendEmailCodeError,
    updatePassword,
    isUpdatingPassword,
    updatePasswordError,
  } = useProfileSettings();

  const [step, setStep] = useState<"request" | "verify">("request");
  const [activeTab, setActiveTab] = useState<"profile" | "email" | "password">(
    "profile",
  );
  const [pendingEmail, setPendingEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);

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
    control: controlVerify,
    handleSubmit: handleSubmitVerify,
    formState: { errors: verifyErrors },
    reset: resetVerifyForm,
  } = useForm<VerifyEmailChangeInput>({
    resolver: zodResolver(verifyEmailChangeSchema),
    defaultValues: {
      code: "",
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
          setPendingEmail(data.email);
          setStep("verify");
          setCooldown(60);
          resetEmailForm({ email: data.email, currentPassword: "" });
          resetVerifyForm();
        },
      },
    );
  };

  const onVerifySubmit = (data: VerifyEmailChangeInput) => {
    verifyEmail(data.code, {
      onSuccess: () => {
        setStep("request");
        setPendingEmail("");
        resetVerifyForm();
      },
    });
  };

  const handleResendCode = () => {
    if (cooldown > 0 || isResendingEmailCode) return;
    resendEmailCode(undefined, {
      onSuccess: () => {
        setCooldown(60);
      },
    });
  };

  const handleCancelVerify = () => {
    setStep("request");
    setPendingEmail("");
    resetVerifyForm();
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

  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  return (
    <div className="space-y-6">
      <div className="flex border-b border-border space-x-1 sm:space-x-2">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer border-none bg-transparent p-0 ${
            activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Profile Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("email")}
          className={`pb-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer border-none bg-transparent p-0 ${
            activeTab === "email"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Email Address
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("password")}
          className={`pb-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer border-none bg-transparent p-0 ${
            activeTab === "password"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Security &amp; Password
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Profile Details</CardTitle>
              <CardDescription>
                Modify your personal name settings.
              </CardDescription>
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
        )}

        {activeTab === "email" &&
          (step === "request" ? (
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
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Email Address Verification</CardTitle>
                <CardDescription>
                  We&apos;ve sent a 6-digit verification code to{" "}
                  <span className="font-semibold text-foreground">
                    {pendingEmail}
                  </span>
                  . Please enter it below to confirm and complete your email
                  change.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form
                  onSubmit={handleSubmitVerify(onVerifySubmit)}
                  className="space-y-6"
                >
                  <FormError
                    message={getAxiosErrorMessage(
                      verifyEmailError || resendEmailCodeError,
                    )}
                  />

                  <VerificationCodeInput
                    control={controlVerify}
                    name="code"
                    disabled={isVerifyingEmail}
                    error={verifyErrors.code?.message}
                  />

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      disabled={cooldown > 0 || isResendingEmailCode}
                      onClick={handleResendCode}
                      className="text-xs text-primary hover:underline disabled:text-muted-foreground/70 disabled:no-underline transition-colors cursor-pointer border-none bg-transparent p-0"
                    >
                      {cooldown > 0
                        ? `Resend code in ${cooldown}s`
                        : "Resend code"}
                    </button>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <FormSubmitButton
                      isLoading={isVerifyingEmail}
                      loadingText="Verifying..."
                    >
                      Confirm Change
                    </FormSubmitButton>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleCancelVerify}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-none bg-transparent p-0"
                      >
                        Cancel &amp; Change Email
                      </button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}

        {activeTab === "password" && (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password. This requires password
                verification and will sign you out on other devices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitPassword(onPasswordSubmit)}
                className="space-y-4"
              >
                <FormError
                  message={getAxiosErrorMessage(updatePasswordError)}
                />

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
        )}
      </div>
    </div>
  );
};
