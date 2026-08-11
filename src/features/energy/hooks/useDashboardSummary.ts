import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  dashboardService,
  LogMonthlyTrendPayload,
} from "../services/dashboard.service";

export const useDashboardSummary = () => {
  const queryClient = useQueryClient();

  const summaryQuery = useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: () => dashboardService.getDashboardSummary(),
  });

  const logMonthlyTrendMutation = useMutation({
    mutationFn: (data: LogMonthlyTrendPayload) =>
      dashboardService.logMonthlyTrend(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });

  const deleteMonthlyTrendMutation = useMutation({
    mutationFn: (month: string) => dashboardService.deleteMonthlyTrend(month),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });

  return {
    summary: summaryQuery.data,
    isLoading: summaryQuery.isLoading,
    error: summaryQuery.error,
    logMonthlyTrend: logMonthlyTrendMutation.mutateAsync,
    isLoggingTrend: logMonthlyTrendMutation.isPending,
    deleteMonthlyTrend: deleteMonthlyTrendMutation.mutateAsync,
    isDeletingTrend: deleteMonthlyTrendMutation.isPending,
  };
};
