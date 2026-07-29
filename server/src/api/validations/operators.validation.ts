import { z } from "zod";

export const createOperatorSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    employeeCode: z.string().optional(),
    designation: z.enum(["Printing", "Cutting", "Packaging"]).default("Printing"),
    shift: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).default("Active"),
  }),
});

export const updateOperatorSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    employeeCode: z.string().optional(),
    designation: z.enum(["Printing", "Cutting", "Packaging"]).optional(),
    shift: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
    isActive: z.coerce.boolean().optional(),
  }),
});

export type CreateOperatorDTO = z.infer<typeof createOperatorSchema>['body'];
export type UpdateOperatorDTO = z.infer<typeof updateOperatorSchema>['body'];
