import { apiClient } from "@/shared/api";
import {
  ApplianceCreate,
  ApplianceResponse,
  ApplianceUpdate,
} from "../types/types";

export const applianceService = {
  async getAppliances(): Promise<ApplianceResponse[]> {
    const response =
      await apiClient.get<ApplianceResponse[]>("/energy/appliances");
    return response.data;
  },

  async createAppliance(data: ApplianceCreate): Promise<ApplianceResponse> {
    const response = await apiClient.post<ApplianceResponse>(
      "/energy/appliances",
      data,
    );
    return response.data;
  },

  async updateAppliance(
    id: string,
    data: ApplianceUpdate,
  ): Promise<ApplianceResponse> {
    const response = await apiClient.put<ApplianceResponse>(
      `/energy/appliances/${id}`,
      data,
    );
    return response.data;
  },

  async deleteAppliance(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `/energy/appliances/${id}`,
    );
    return response.data;
  },
};
