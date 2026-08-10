import { z } from "zod";

export const inkPurchaseSchema = z.object({
  reportDate: z.string().min(1, "Report date is required"),
  materialCode: z.string().trim().min(1, "Material code is required"),
  vendor: z.string().trim().min(1, "Vendor is required"),
  invoiceNumber: z.string().optional().or(z.literal("")),
  quantity: z.coerce.number().positive("Must be > 0"),
  weightPerQty: z.coerce.number().positive("Must be > 0"),
});
export type InkPurchaseSchemaInput = z.input<typeof inkPurchaseSchema>;

export const inkConsumptionSchema = z.object({
  materialCode: z.string().trim().min(1, "Material code is required"),
  qtyAssigned: z.coerce.number().positive("Must be > 0"),
  operatorId: z.number().int().positive().nullable(),
  weight: z.coerce.number().positive("Must be > 0"),
  note: z.string().optional().or(z.literal("")),
});
export type InkConsumptionSchemaInput = z.input<typeof inkConsumptionSchema>;
