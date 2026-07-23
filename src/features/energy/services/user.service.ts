import { apiClient } from "@/shared/api";
import { UserSettingsPatchRequest, UserSettingsResponse } from "../types/types";

export const userService = {
  async getUserSettings(): Promise<UserSettingsResponse> {
    const response =
      await apiClient.get<UserSettingsResponse>("/users/settings");
    return response.data;
  },

  async updateUserSettings(
    data: UserSettingsPatchRequest,
  ): Promise<UserSettingsResponse> {
    const response = await apiClient.patch<UserSettingsResponse>(
      "/users/settings",
      data,
    );
    return response.data;
  },
};
