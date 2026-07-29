import { z } from "zod";

export const materialSchema = z.object({
  code: z.string().min(1, "Material code is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().optional().or(z.literal("")),
  weightPerRoll: z.coerce.number().positive("Weight must be positive"),
  minStockLevel: z.coerce.number().int().min(0, "Must be 0 or more"),
  reorderQty: z.coerce.number().int().min(0, "Must be 0 or more"),
});

export type MaterialSchemaInput = z.infer<typeof materialSchema>;

/** Fixed, searchable material type options. */
export const MATERIAL_TYPES = [
  "Taffeta",
  "Satin",
  "Micro Fiber",
  "Pearl Finish Satin",
  "Dull Satin",
  "Accted Taffeta",
  "Tearaway",
  "Cotton",
  "Recycle Satin",
  "Sheets",
] as const;

/** Fixed, searchable material description options. */
export const MATERIAL_DESCRIPTIONS = [
  "Paper Label",
  "Simple Satin",
  "Double Side Simple Satin",
  "Single Side Woven Edge",
  "Double Side Woven Edge",
  "Micro Fiber",
  "Pearl Finish Satin",
  "Dull Satin",
  "Accted Taffeta",
  "Tearaway Fabric",
  "White Cotton",
  "Off White Cotton",
  "Simple Satin Black",
  "Double Side Simple Satin Black",
  "Single Side Woven Edge Black",
  "Double Side Woven Edge Black",
  "Recycle Single Side Satin",
  "Label Fabric",
  "Recycle Single Side Satin 20% Recycle",
  "Single Side Woven Edge 20% Recycle",
  "Double Side Woven Edge 20% Recycle",
  "Tearaway Fabric 20% Recycle",
  "Dull Satin 20% Recycle",
] as const;
