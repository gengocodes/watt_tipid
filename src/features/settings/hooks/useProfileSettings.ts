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
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.ME });
      toast.success("Email address updated successfully!");
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

    updatePassword: updatePasswordMutation.mutate,
    isUpdatingPassword: updatePasswordMutation.isPending,
    updatePasswordError: updatePasswordMutation.error,
  };
};
