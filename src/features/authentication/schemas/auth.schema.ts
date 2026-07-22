import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  barangayCity: z.string().min(1, "Barangay / City is required"),
  email: z.email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
      /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
      "Password must contain at least one special character.",
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
