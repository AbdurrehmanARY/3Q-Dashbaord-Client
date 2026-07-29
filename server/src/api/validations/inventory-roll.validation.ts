import { z } from "zod";

export const createInventoryRollSchema = z.object({
  body: z.object({
    materialCode: z.string().min(1, "Material code is required"),
    openingStock: z.coerce.number().min(0, "Opening stock cannot be negative").optional(),
    receivedRolls: z.coerce.number().min(0, "Received rolls cannot be negative").optional(),
    issuedRolls: z.coerce.number().min(0, "Issued rolls cannot be negative").optional(),
    balanceRolls: z.coerce.number().min(0, "Balance rolls cannot be negative").optional(),
    rollPerKg: z.coerce.number().min(0, "Roll per kg cannot be negative").optional(),
  }),
});

export const updateInventoryRollSchema = z.object({
  body: z.object({
    openingStock: z.coerce.number().min(0, "Opening stock cannot be negative").optional(),
    receivedRolls: z.coerce.number().min(0, "Received rolls cannot be negative").optional(),
    issuedRolls: z.coerce.number().min(0, "Issued rolls cannot be negative").optional(),
    balanceRolls: z.coerce.number().min(0, "Balance rolls cannot be negative").optional(),
    rollPerKg: z.coerce.number().min(0, "Roll per kg cannot be negative").optional(),
  }),
});

// Flat (not wrapped in `{ params: … }`) because `validateParams` parses `req.params` directly.
export const inventoryRollParamsSchema = z.object({
  materialCode: z.string().min(1, "Material code is required"),
});

export type CreateInventoryRollDTO = z.infer<typeof createInventoryRollSchema>['body'];
export type UpdateInventoryRollDTO = z.infer<typeof updateInventoryRollSchema>['body'];
