import { z } from "zod";

export const CATEGORIES = [
  "Kitchen",
  "Cooling",
  "Entertainment",
  "Laundry",
  "Lighting",
  "Devices",
  "Other",
] as const;

export const applianceSchema = z.object({
  name: z
    .string()
    .min(2, "Appliance name must be at least 2 characters")
    .max(50, "Appliance name cannot exceed 50 characters")
    .trim(),
  category: z.enum(CATEGORIES, {
    message: "Please select a valid category",
  }),
  wattage_watts: z
    .number({ message: "Wattage must be a number" })
    .gt(0, "Wattage must be greater than 0 watts"),
  daily_usage_hours: z
    .number({ message: "Daily usage must be a number" })
    .gt(0, "Daily usage must be greater than 0 hours")
    .lte(24, "Daily usage cannot exceed 24 hours per day"),
  icon: z.string().min(1, "Please select an icon"),
});

export type ApplianceInput = z.infer<typeof applianceSchema>;
