import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export const emailSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  email: z.email("Invalid email address"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/\d/, "Password must contain at least one number.")
      .regex(
        /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
        "Password must contain at least one special character.",
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const electricityRateSchema = z.object({
  electricityRatePhpKwh: z
    .number({ message: "Rate must be a number" })
    .gt(0, "Rate must be greater than 0"),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
export type ElectricityRateInput = z.infer<typeof electricityRateSchema>;
