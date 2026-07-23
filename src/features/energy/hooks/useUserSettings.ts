import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { UserSettingsPatchRequest } from "../types/types";

export const useUserSettings = () => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ["userSettings"],
    queryFn: () => userService.getUserSettings(),
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (data: UserSettingsPatchRequest) =>
      userService.updateUserSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });

  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    error: settingsQuery.error,

    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,
    updateError: updateSettingsMutation.error,
  };
};
