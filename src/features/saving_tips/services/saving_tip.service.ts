import { apiClient } from "@/shared/api";
import {
  SavingTipResponse,
  SavingTipsSummaryResponse,
  SavingTipStatusUpdate,
  HouseholdAnalysisStatusResponse,
  GenerateTipsResponse,
} from "../types/types";

export const savingTipService = {
  async getSavingTips(): Promise<SavingTipResponse[]> {
    const response = await apiClient.get<SavingTipResponse[]>("/saving-tips");
    return response.data;
  },

  async getSavingTipsSummary(): Promise<SavingTipsSummaryResponse> {
    const response = await apiClient.get<SavingTipsSummaryResponse>(
      "/saving-tips/summary",
    );
    return response.data;
  },

  async getAnalysisStatus(): Promise<HouseholdAnalysisStatusResponse> {
    const response = await apiClient.get<HouseholdAnalysisStatusResponse>(
      "/saving-tips/analysis-status",
    );
    return response.data;
  },

  async generateHouseholdTips(): Promise<GenerateTipsResponse> {
    const response = await apiClient.post<GenerateTipsResponse>(
      "/saving-tips/generate",
    );
    return response.data;
  },

  async updateTipStatus(
    tipId: string,
    data: SavingTipStatusUpdate,
  ): Promise<SavingTipResponse> {
    const response = await apiClient.patch<SavingTipResponse>(
      `/saving-tips/${tipId}/status`,
      data,
    );
    return response.data;
  },
};
