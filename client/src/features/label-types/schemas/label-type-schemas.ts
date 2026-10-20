import { z } from "zod";

export const labelTypeSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"),
  category: z.enum(["woven", "printed"]),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createLabelTypeSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"),
  category: z.enum(["woven", "printed"]),
});

export const updateLabelTypeSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less").optional(),
  category: z.enum(["woven", "printed"]).optional(),
  isActive: z.boolean().optional(),
});

export type LabelTypeFormData = z.infer<typeof createLabelTypeSchema>;
export type UpdateLabelTypeFormData = z.infer<typeof updateLabelTypeSchema>;