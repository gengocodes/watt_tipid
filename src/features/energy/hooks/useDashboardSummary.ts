import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export const useDashboardSummary = () => {
  const summaryQuery = useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: () => dashboardService.getDashboardSummary(),
  });

  return {
    summary: summaryQuery.data,
    isLoading: summaryQuery.isLoading,
    error: summaryQuery.error,
  };
};
