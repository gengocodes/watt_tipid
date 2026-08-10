import { useEffect, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { savingTipService } from "../services/saving_tip.service";
import { SavingTipStatusUpdate } from "../types/types";
import { computeTipCounts } from "../utils/saving_tips.utils";

export const useSavingTips = () => {
  const queryClient = useQueryClient();

  const tipsQuery = useQuery({
    queryKey: ["savingTips"],
    queryFn: () => savingTipService.getSavingTips(),
  });

  const summaryQuery = useQuery({
    queryKey: ["savingTipsSummary"],
    queryFn: () => savingTipService.getSavingTipsSummary(),
  });

  const statusQuery = useQuery({
    queryKey: ["savingTipsAnalysisStatus"],
    queryFn: () => savingTipService.getAnalysisStatus(),
    refetchInterval: (query) => {
      const status = query.state.data?.session_status;
      return status === "IN_PROGRESS" ? 3000 : false;
    },
  });

  // Track previous session status to invalidate queries when analysis completes
  const prevStatusRef = useRef(statusQuery.data?.session_status);

  useEffect(() => {
    const currentStatus = statusQuery.data?.session_status;
    const prevStatus = prevStatusRef.current;

    if (
      prevStatus === "IN_PROGRESS" &&
      currentStatus &&
      currentStatus !== "IN_PROGRESS"
    ) {
      queryClient.invalidateQueries({ queryKey: ["savingTips"] });
      queryClient.invalidateQueries({ queryKey: ["savingTipsSummary"] });
      queryClient.invalidateQueries({ queryKey: ["appliances"] });
    }

    prevStatusRef.current = currentStatus;
  }, [statusQuery.data?.session_status, queryClient]);

  const generateMutation = useMutation({
    mutationFn: () => savingTipService.generateHouseholdTips(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savingTipsAnalysisStatus"] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SavingTipStatusUpdate }) =>
      savingTipService.updateTipStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savingTips"] });
      queryClient.invalidateQueries({ queryKey: ["savingTipsSummary"] });
    },
  });

  const tips = useMemo(() => tipsQuery.data ?? [], [tipsQuery.data]);
  const tipCounts = useMemo(() => computeTipCounts(tips), [tips]);

  return {
    tips,
    tipCounts,
    isLoadingTips: tipsQuery.isLoading,
    tipsError: tipsQuery.error,

    summary: summaryQuery.data,
    isLoadingSummary: summaryQuery.isLoading,
    summaryError: summaryQuery.error,

    analysisStatus: statusQuery.data,
    isLoadingAnalysisStatus: statusQuery.isLoading,
    analysisStatusError: statusQuery.error,

    generateTips: generateMutation.mutateAsync,
    isGeneratingTips: generateMutation.isPending,
    generateError: generateMutation.error,

    updateStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};
