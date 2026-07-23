export interface ApplianceResponse {
  id: string;
  user_id: string;
  name: string;
  category: string;
  wattage_watts: number;
  daily_usage_hours: number;
  icon: string;
  is_active: boolean;
  monthly_kwh: number;
  created_at: string;
  updated_at: string;
}

export interface ApplianceCreate {
  name: string;
  category: string;
  wattage_watts: number;
  daily_usage_hours: number;
  icon: string;
}

export interface ApplianceUpdate {
  name?: string;
  category?: string;
  wattage_watts?: number;
  daily_usage_hours?: number;
  icon?: string;
  is_active?: boolean;
}

export interface CategoryShare {
  category: string;
  kwh: number;
  percentage: number;
}

export interface MonthlyTrendItem {
  month: string;
  kwh: number;
  cost: number;
}

export interface EnergySummaryResponse {
  estimated_monthly_cost: number;
  total_monthly_kwh: number;
  appliance_count: number;
  electricity_rate_php_kwh: number;
  energy_saving_score: number;
  score_status: string;
  category_shares: CategoryShare[];
  monthly_trend: MonthlyTrendItem[];
}

export interface UserSettingsResponse {
  electricity_rate_php_kwh: number;
}

export interface UserSettingsPatchRequest {
  electricity_rate_php_kwh?: number;
}
