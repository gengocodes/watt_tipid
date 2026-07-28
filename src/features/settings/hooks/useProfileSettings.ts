import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "../services/settings.service";
import { AUTH_KEYS } from "@/features/authentication";
import { toast } from "react-toastify";
import {
  UserProfileUpdateRequest,
  UserEmailUpdateRequest,
  UserPasswordUpdateRequest,
} from "../types";

export const useProfileSettings = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UserProfileUpdateRequest) =>
      settingsService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.ME });
      toast.success("Profile details updated successfully!");
    },
  });

  const updateEmailMutation = useMutation({
    mutationFn: (data: UserEmailUpdateRequest) =>
      settingsService.updateEmail(data),
    onSuccess: () => {
      toast.success("Verification code sent to your new email!");
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (code: string) => settingsService.verifyEmailChange(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.ME });
      toast.success("Email address updated successfully!");
    },
  });

  const resendEmailCodeMutation = useMutation({
    mutationFn: () => settingsService.resendEmailChangeCode(),
    onSuccess: () => {
      toast.success("Verification code resent successfully!");
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: UserPasswordUpdateRequest) =>
      settingsService.updatePassword(data),
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,

    updateEmail: updateEmailMutation.mutate,
    isUpdatingEmail: updateEmailMutation.isPending,
    updateEmailError: updateEmailMutation.error,

    verifyEmail: verifyEmailMutation.mutate,
    isVerifyingEmail: verifyEmailMutation.isPending,
    verifyEmailError: verifyEmailMutation.error,

    resendEmailCode: resendEmailCodeMutation.mutate,
    isResendingEmailCode: resendEmailCodeMutation.isPending,
    resendEmailCodeError: resendEmailCodeMutation.error,

    updatePassword: updatePasswordMutation.mutate,
    isUpdatingPassword: updatePasswordMutation.isPending,
    updatePasswordError: updatePasswordMutation.error,
  };
};
