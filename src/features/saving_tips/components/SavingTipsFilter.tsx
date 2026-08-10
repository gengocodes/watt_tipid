"use client";

import { FilterTab } from "../types/types";
import { TipCounts } from "../utils/saving_tips.utils";
import {
  SAVING_TIPS_TABS,
  FILTER_TAB_ACTIVE_STYLES,
} from "../constants/constants";

interface SavingTipsFilterProps {
  activeTab: FilterTab;
  onSelectTab: (tab: FilterTab) => void;
  counts: TipCounts;
}

export function SavingTipsFilter({
  activeTab,
  onSelectTab,
  counts,
}: Readonly<SavingTipsFilterProps>) {
  return (
    <div data-tour="savings-filter-tabs" className="flex items-center gap-1 border-b pb-3 mb-6 overflow-x-auto">
      {SAVING_TIPS_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = counts[tab.id];

        return (
          <button
            type="button"
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 cursor-pointer ${
              isActive
                ? FILTER_TAB_ACTIVE_STYLES
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
