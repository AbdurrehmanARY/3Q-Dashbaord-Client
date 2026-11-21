import { z } from "zod";
import { userRoleEnum, users } from "@db/schema";

type UserRole = typeof users.$inferSelect["role"];

export const userRoleSchema = z.enum(userRoleEnum.enumValues as [UserRole, ...UserRole[]]);

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    employeeCode: z.string().optional(),
    email: z.string().email("Must be a valid email").optional(),
    role: userRoleSchema,
    passwordHash: z.string().min(1, "Password hash is required"),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).optional(),
    employeeCode: z.string().optional(),
    email: z.string().email("Must be a valid email").optional(),
    role: userRoleSchema.optional(),
    isActive: z.coerce.boolean().optional(),
  }),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>["body"];
export type UpdateUserDTO = z.infer<typeof updateUserSchema>["body"];
