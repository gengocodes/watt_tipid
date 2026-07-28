import { apiClient } from "@/shared/api";
import {
  UserProfileUpdateRequest,
  UserProfileResponse,
  UserEmailUpdateRequest,
  UserEmailResponse,
  UserPasswordUpdateRequest,
  UserPasswordResponse,
} from "../types";

export const settingsService = {
  async updateProfile(
    data: UserProfileUpdateRequest,
  ): Promise<UserProfileResponse> {
    const response = await apiClient.patch<UserProfileResponse>(
      "/users/profile",
      data,
    );
    return response.data;
  },

  async updateEmail(
    data: UserEmailUpdateRequest,
  ): Promise<UserEmailResponse> {
    const response = await apiClient.patch<UserEmailResponse>(
      "/users/email",
      data,
    );
    return response.data;
  },

  async verifyEmailChange(code: string): Promise<UserEmailResponse> {
    const response = await apiClient.post<UserEmailResponse>("/users/email/verify", {
      code,
    });
    return response.data;
  },

  async resendEmailChangeCode(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      "/users/email/resend",
    );
    return response.data;
  },

  async updatePassword(
    data: UserPasswordUpdateRequest,
  ): Promise<UserPasswordResponse> {
    const response = await apiClient.patch<UserPasswordResponse>(
      "/users/password",
      data,
    );
    return response.data;
  },
};
