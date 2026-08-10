"use client";

import { useState } from "react";
import {
  useSavingTips,
  filterTips,
  SavingTipsSummaryHeader,
  SavingTipsFilter,
  SavingTipCard,
  SavingTipsOnboarding,
  SavingTipsEmptyState,
  SavingTipsSkeleton,
  FilterTab,
  SavingTipStatus,
  MINIMUM_APPLIANCES_FOR_TIPS,
} from "@/features/saving_tips";
import { useAppliances } from "@/features/energy/hooks/useAppliances";

export default function SavingsTipsPage() {
  const {
    tips,
    tipCounts,
    isLoadingTips,
    summary,
    isLoadingSummary,
    analysisStatus,
    generateTips,
    isGeneratingTips,
    updateStatus,
    isUpdatingStatus,
  } = useSavingTips();

  const { appliances, isLoading: isLoadingAppliances } = useAppliances();
  const activeAppliances = appliances.filter((app) => app.is_active);
  const activeCount = activeAppliances.length;
  const isThresholdMet = activeCount >= MINIMUM_APPLIANCES_FOR_TIPS;

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const filteredTips = filterTips(tips, activeTab);

  const handleUpdateStatus = (
    id: string,
    newStatus: Exclude<SavingTipStatus, "stale">,
  ) => {
    updateStatus({ id, data: { status: newStatus } });
  };

  const handleGenerateTips = async () => {
    try {
      await generateTips();
    } catch (err) {
      console.error("Failed to start household analysis:", err);
    }
  };

  if (isLoadingAppliances) {
    return (
      <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <SavingTipsSkeleton />
      </div>
    );
  }

  if (!isThresholdMet) {
    return (
      <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <SavingTipsOnboarding activeCount={activeCount} />
      </div>
    );
  }

  const renderTipsContent = () => {
    if (isLoadingTips) {
      return <SavingTipsSkeleton />;
    }

    if (filteredTips.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {filteredTips.map((tip) => (
            <SavingTipCard
              key={tip.id}
              tip={tip}
              onUpdateStatus={handleUpdateStatus}
              isUpdating={isUpdatingStatus}
            />
          ))}
        </div>
      );
    }

    return (
      <SavingTipsEmptyState
        totalTipsCount={tips.length}
        activeTab={activeTab}
      />
    );
  };

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <SavingTipsSummaryHeader
        summary={summary}
        isLoading={isLoadingSummary}
        analysisStatus={analysisStatus}
        onGenerate={handleGenerateTips}
        isGenerating={isGeneratingTips}
      />
      <SavingTipsFilter
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={tipCounts}
      />
      {renderTipsContent()}
    </div>
  );
}
