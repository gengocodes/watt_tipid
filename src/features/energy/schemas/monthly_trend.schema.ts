import { z } from "zod";

const currentYearMonth = new Date().toISOString().slice(0, 7);

export const monthlyTrendSchema = z.object({
  month: z
    .string()
    .min(1, "Month is required")
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month must be in YYYY-MM format")
    .refine(
      (val) => val <= currentYearMonth,
      "Cannot log consumption for future months",
    ),
  kwh: z.coerce
    .number()
    .gt(0, "Monthly consumption must be greater than 0 kWh"),
  cost_php: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().gt(0, "Cost must be greater than ₱0").optional(),
  ),
});

export type MonthlyTrendFormValues = z.infer<typeof monthlyTrendSchema>;
