export type FilterTab = "all" | "active" | "completed" | "stale";
export type SavingTipPriority = "LOW" | "MEDIUM" | "HIGH";
export type SavingTipEffort = "LOW" | "MEDIUM" | "HIGH";
export type SavingTipType = "CALCULATED" | "REFERENCE";
export type SavingTipStatus = "active" | "completed" | "stale" | "deleted";
export type AnalysisSessionStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "OUTDATED";

export interface SavingTipResponse {
  id: string;
  user_id: string;
  session_id: string | null;
  appliance_id: string;
  appliance_name: string;
  appliance_category: string;
  appliance_wattage_watts: number;
  appliance_daily_usage_hours: number;
  appliance_monthly_kwh: number;
  title: string;
  description: string;
  priority: SavingTipPriority;
  effort_level: SavingTipEffort;
  recommended_daily_usage_reduction_hours: number | null;
  estimated_monthly_savings: number | null;
  tip_type: SavingTipType;
  source_url: string | null;
  source_name: string | null;
  status: SavingTipStatus;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface SavingTipsSummaryResponse {
  total_potential_monthly_savings: number;
  total_yearly_savings: number;
  total_tips_count: number;
  easy_wins_count: number;
  percentage_bill_reduction: number;
}

export interface SavingTipStatusUpdate {
  status: "active" | "completed" | "deleted";
}

export interface HouseholdAnalysisStatusResponse {
  session_status: AnalysisSessionStatus | null;
  is_cooldown_active: boolean;
  is_household_outdated: boolean;
  current_household_snapshot_version: string;
  analyzed_household_snapshot_version: string | null;
  next_allowed_analysis_at: string | null;
  active_appliance_count: number;
}

export interface GenerateTipsResponse {
  session_id: string;
  message: string;
  status: AnalysisSessionStatus;
}
