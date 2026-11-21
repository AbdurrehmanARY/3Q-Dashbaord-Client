import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  role: z.enum(["office_staff", "production_manager", "production_operator"]),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;