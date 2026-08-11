import { apiClient } from "@/shared/api";
import { EnergySummaryResponse, MonthlyTrendItem } from "../types/types";

export interface LogMonthlyTrendPayload {
  month: string;
  kwh: number;
  cost_php?: number;
}

export const dashboardService = {
  async getDashboardSummary(): Promise<EnergySummaryResponse> {
    const response =
      await apiClient.get<EnergySummaryResponse>("/dashboard/summary");
    return response.data;
  },

  async logMonthlyTrend(
    data: LogMonthlyTrendPayload,
  ): Promise<MonthlyTrendItem> {
    const response = await apiClient.post<MonthlyTrendItem>(
      "/dashboard/monthly-trend",
      data,
    );
    return response.data;
  },

  async deleteMonthlyTrend(month: string): Promise<void> {
    await apiClient.delete(`/dashboard/monthly-trend/${month}`);
  },
};
