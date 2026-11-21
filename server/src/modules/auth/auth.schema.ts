import { z } from "zod";
import { userRoleEnum, users } from "@db/schema";

type UserRole = typeof users.$inferSelect["role"];

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(255),
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
    role: z.enum(userRoleEnum.enumValues as [UserRole, ...UserRole[]]),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(1, "Password is required"),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }),
});

export type RegisterDTO = z.infer<typeof registerSchema>["body"];
export type LoginDTO = z.infer<typeof loginSchema>["body"];