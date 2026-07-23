import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applianceService } from "../services/appliance.service";
import { ApplianceCreate, ApplianceUpdate } from "../types/types";

export const useAppliances = () => {
  const queryClient = useQueryClient();

  const appliancesQuery = useQuery({
    queryKey: ["appliances"],
    queryFn: () => applianceService.getAppliances(),
  });

  const createMutation = useMutation({
    mutationFn: (data: ApplianceCreate) =>
      applianceService.createAppliance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appliances"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ApplianceUpdate }) =>
      applianceService.updateAppliance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appliances"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => applianceService.deleteAppliance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appliances"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });

  return {
    appliances: appliancesQuery.data ?? [],
    isLoading: appliancesQuery.isLoading,
    error: appliancesQuery.error,

    createAppliance: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    updateAppliance: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    deleteAppliance: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
};
