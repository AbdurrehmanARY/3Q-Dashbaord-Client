import { z } from "zod";

/**
 * `totalRoll`/`totalRollPer200m`/`invoiceWeight`/`localWeight` are all calculated —
 * displayed in the form, never registered as submittable inputs.
 */
export const purchaseSchema = z.object({
  reportDate: z.string().min(1, "Date is required"),
  materialCode: z.string().min(1, "Material code is required"),
  invoiceNumber: z.string().min(1, "invoice number is required"),
  vendor: z.string().min(1, "Vendor is required"),
  gdNumber: z.string().optional(),
  cartonQty: z.coerce.number().positive("Must be positive"),
  rollsPerCarton: z.coerce.number().positive("Must be positive"),
  rollLength: z.coerce.number().positive("Must be positive"),
  netWeight: z.coerce.number().positive("Must be positive"),
  /** Enterable weight per roll (kg). Total Weight = Total Rolls × Weight Per Roll. */
  weightPerRoll: z.coerce.number().positive("Must be positive"),
  efs: z.string().optional(),
});

export type PurchaseSchemaInput = z.infer<typeof purchaseSchema>;
