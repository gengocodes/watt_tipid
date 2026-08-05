import {
  LucideIcon,
  Snowflake,
  Wind,
  Tv,
  Smartphone,
  Waves,
  Refrigerator as RefrigIcon,
  FlameKindling,
  Lightbulb,
  Plug,
} from "lucide-react";

export interface IconConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string; // text color class
  activeClass: string; // active ring classes
}

export const ICONS_CONFIG: IconConfig[] = [
  {
    value: "snowflake",
    label: "Snowflake",
    icon: Snowflake,
    color: "text-sky-500",
    activeClass: "ring-2 ring-sky-500 border-sky-300 bg-sky-50/50 text-sky-600",
  },
  {
    value: "wind",
    label: "Wind/AC",
    icon: Wind,
    color: "text-teal-500",
    activeClass:
      "ring-2 ring-teal-500 border-teal-300 bg-teal-50/50 text-teal-600",
  },
  {
    value: "tv",
    label: "TV",
    icon: Tv,
    color: "text-indigo-500",
    activeClass:
      "ring-2 ring-indigo-500 border-indigo-300 bg-indigo-50/50 text-indigo-600",
  },
  {
    value: "smartphone",
    label: "Device",
    icon: Smartphone,
    color: "text-purple-500",
    activeClass:
      "ring-2 ring-purple-500 border-purple-300 bg-purple-50/50 text-purple-600",
  },
  {
    value: "laundry",
    label: "Laundry",
    icon: Waves,
    color: "text-cyan-500",
    activeClass:
      "ring-2 ring-cyan-500 border-cyan-300 bg-cyan-50/50 text-cyan-600",
  },
  {
    value: "refrigerator",
    label: "Fridge",
    icon: RefrigIcon,
    color: "text-orange-500",
    activeClass:
      "ring-2 ring-orange-500 border-orange-300 bg-orange-50/50 text-orange-600",
  },
  {
    value: "kettle",
    label: "Stove",
    icon: FlameKindling,
    color: "text-amber-500",
    activeClass:
      "ring-2 ring-amber-500 border-amber-300 bg-amber-50/50 text-amber-600",
  },
  {
    value: "lightbulb",
    label: "Light",
    icon: Lightbulb,
    color: "text-yellow-500",
    activeClass:
      "ring-2 ring-yellow-500 border-yellow-300 bg-yellow-50/50 text-yellow-600",
  },
  {
    value: "plug",
    label: "Other",
    icon: Plug,
    color: "text-slate-400",
    activeClass:
      "ring-2 ring-slate-500 border-slate-300 bg-slate-55 bg-slate-50 text-slate-700",
  },
];

export const CATEGORY_STYLES: Record<string, string> = {
  Cooling: "bg-sky-50/85 text-sky-700 border border-sky-100/30",
  Kitchen: "bg-orange-50/85 text-orange-700 border border-orange-100/30",
  Entertainment: "bg-indigo-50/85 text-indigo-700 border border-indigo-100/30",
  Laundry: "bg-cyan-50/85 text-cyan-700 border border-cyan-100/30",
  Lighting: "bg-yellow-50/85 text-yellow-700 border border-yellow-100/30",
  Devices: "bg-purple-50/85 text-purple-700 border border-purple-100/30",
  Other: "bg-slate-50/85 text-slate-700 border border-slate-100/30",
};

export const CATEGORY_COLORS: Record<string, string> = {
  Kitchen: "#f97316", // orange-500
  Cooling: "#0ea5e9", // sky-500
  Entertainment: "#6366f1", // indigo-500
  Laundry: "#06b6d4", // cyan-500
  Lighting: "#eab308", // yellow-500
  Devices: "#a855f7", // purple-500
  Other: "#64748b", // slate-500
};

export const CATEGORY_TEXT_CLASSES: Record<string, string> = {
  Kitchen: "text-orange-500",
  Cooling: "text-sky-500",
  Entertainment: "text-indigo-500",
  Laundry: "text-cyan-500",
  Lighting: "text-yellow-500",
  Devices: "text-purple-500",
  Other: "text-slate-500",
};

export interface StatusTheme {
  strokeClass: string;
  textClass: string;
  bgTrail: string;
  description: string;
}

export const STATUS_THEMES: Record<string, StatusTheme> = {
  Excellent: {
    strokeClass: "stroke-emerald-500",
    textClass: "text-emerald-600",
    bgTrail: "stroke-emerald-100/30",
    description:
      "Superb energy savings! Keep maintaining your efficient lifestyle.",
  },
  Good: {
    strokeClass: "stroke-teal-500",
    textClass: "text-teal-600",
    bgTrail: "stroke-teal-100/30",
    description:
      "Great job saving power! You are doing better than most PH households.",
  },
  Fair: {
    strokeClass: "stroke-amber-500",
    textClass: "text-amber-600",
    bgTrail: "stroke-amber-100/30",
    description:
      "Moderate energy saving. Check our savings recommendations for improvements.",
  },
  Poor: {
    strokeClass: "stroke-rose-500",
    textClass: "text-rose-600",
    bgTrail: "stroke-rose-100/30",
    description:
      "There's room to improve. Check our AI advisor for customized savings tips.",
  },
};
