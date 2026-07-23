import { apiClient } from "@/shared/api";
import { EnergySummaryResponse } from "../types/types";

export const dashboardService = {
  async getDashboardSummary(): Promise<EnergySummaryResponse> {
    const response =
      await apiClient.get<EnergySummaryResponse>("/dashboard/summary");
    return response.data;
  },
};
