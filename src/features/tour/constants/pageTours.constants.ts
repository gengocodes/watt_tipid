import { TourConfig } from "@oqlet/react-driver";

export const DASHBOARD_TOUR_ID = "dashboard-tour";
export const APPLIANCES_TOUR_ID = "appliances-tour";
export const SAVINGS_TIPS_TOUR_ID = "savings-tips-tour";
export const CHAT_TOUR_ID = "chat-tour";
export const SETTINGS_TOUR_ID = "settings-tour";

export const ROUTE_TOUR_MAP: Record<string, string> = {
  "/dashboard": DASHBOARD_TOUR_ID,
  "/appliances": APPLIANCES_TOUR_ID,
  "/savings-tips": SAVINGS_TIPS_TOUR_ID,
  "/chat": CHAT_TOUR_ID,
  "/settings": SETTINGS_TOUR_ID,
};

export const DASHBOARD_TOUR: TourConfig = {
  id: DASHBOARD_TOUR_ID,
  steps: [
    {
      target: '[data-tour="dashboard-score"]',
      title: "Energy Efficiency Score",
      content:
        "View your household's real-time energy efficiency rating and score status badge.",
      side: "bottom",
    },
    {
      target: '[data-tour="dashboard-stats"]',
      title: "Monthly Usage Summary",
      content:
        "Track your total monthly energy consumption in kWh and estimated bill in PHP.",
      side: "bottom",
    },
    {
      target: '[data-tour="dashboard-chart"]',
      title: "Consumption Trends & Categories",
      content:
        "Analyze historical monthly usage trends and category shares across your appliances.",
      side: "top",
    },
    {
      target: '[data-tour="dashboard-manage-history"]',
      title: "Manage Monthly History",
      content:
        "Log, update, or delete historical monthly kWh consumption and bill cost entries to build multi-month trend charts.",
      side: "left",
    },
  ],
};

export const APPLIANCES_TOUR: TourConfig = {
  id: APPLIANCES_TOUR_ID,
  steps: [
    {
      target: '[data-tour="appliances-header"]',
      title: "Appliance Overview",
      content:
        "Track and manage your registered appliances to estimate monthly energy consumption accurately.",
      side: "bottom",
    },
    {
      target: '[data-tour="appliances-add-btn"]',
      title: "Register Appliance",
      content:
        "Click here to register a new household appliance with power rating and daily usage hours.",
      side: "bottom",
    },
    {
      target: '[data-tour="appliances-table"]',
      title: "Appliance Inventory",
      content:
        "View wattage, daily usage, monthly kWh, analysis status, or edit device details.",
      side: "top",
    },
  ],
};

export const SAVINGS_TIPS_TOUR: TourConfig = {
  id: SAVINGS_TIPS_TOUR_ID,
  steps: [
    {
      target: '[data-tour="savings-onboarding"]',
      title: "Unlock Personalized AI Tips",
      content:
        "Add at least 5 active appliances so Gorlock AI can evaluate your household and generate custom energy saving recommendations.",
      side: "bottom",
      visibleWhen: () =>
        typeof document !== "undefined" &&
        Boolean(document.querySelector('[data-tour="savings-onboarding"]')),
    },
    {
      target: '[data-tour="savings-header"]',
      title: "Potential Monthly Savings",
      content:
        "See your total estimated PHP reduction if all recommended energy tips are applied.",
      side: "bottom",
      visibleWhen: () =>
        typeof document !== "undefined" &&
        Boolean(document.querySelector('[data-tour="savings-header"]')),
    },
    {
      target: '[data-tour="savings-filter-tabs"]',
      title: "Priority Filters",
      content:
        "Filter savings recommendations by impact priority (High, Medium, Low impact).",
      side: "bottom",
      visibleWhen: () =>
        typeof document !== "undefined" &&
        Boolean(document.querySelector('[data-tour="savings-filter-tabs"]')),
    },
    {
      target: '[data-tour="savings-tip-card"]',
      title: "AI Savings Recommendation",
      content:
        "Explore actionable usage adjustments, wattage impacts, and detailed calculation breakdowns.",
      side: "top",
      visibleWhen: () =>
        typeof document !== "undefined" &&
        Boolean(document.querySelector('[data-tour="savings-tip-card"]')),
    },
  ],
};

export const CHAT_TOUR: TourConfig = {
  id: CHAT_TOUR_ID,
  steps: [
    {
      target: '[data-tour="chat-messages"]',
      title: "WattTipid AI Assistant",
      content:
        "Chat with your agentic energy assistant for personalized recommendations and web sources.",
      side: "bottom",
    },
    {
      target: '[data-tour="chat-prompts"]',
      title: "Suggested Prompts",
      content:
        "Click any quick prompt to immediately analyze usage or get customized saving strategies.",
      side: "top",
    },
    {
      target: '[data-tour="chat-input"]',
      title: "Chat Input",
      content:
        "Type any question or instruction here to manage your appliances or ask for advice.",
      side: "top",
    },
  ],
};

export const SETTINGS_TOUR: TourConfig = {
  id: SETTINGS_TOUR_ID,
  steps: [
    {
      target: '[data-tour="settings-profile"]',
      title: "Household Profile",
      content:
        "Update your personal details, email, and barangay/city location settings.",
      side: "bottom",
    },
    {
      target: '[data-tour="settings-security"]',
      title: "Security & Password",
      content:
        "Manage your password updates and secure account access preferences.",
      side: "top",
    },
  ],
};
