import { z } from "zod";
import { THREAD_DENIERS, THREAD_BASE_COLORS } from "../types";

/**
 * Total weight is deliberately absent — the server always computes it as
 * `weightPerCtnKg × totalCtns`. The form previews it, but never submits it.
 */
export const threadPurchaseSchema = z.object({
  receivedDate: z.string().min(1, "Received date is required"),
  denier: z.enum(THREAD_DENIERS),
  threadColor: z.enum(THREAD_BASE_COLORS),
  vendor: z.string().min(1, "Vendor is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  totalCtns: z.coerce.number().int().positive("Total cartons must be greater than 0"),
  weightPerCtnKg: z.coerce.number().positive("Weight per carton must be greater than 0"),
  notes: z.string().optional().or(z.literal("")),
});

export const dyeBatchSchema = z
  .object({
    denier: z.enum(THREAD_DENIERS),
    fromColorName: z.enum(THREAD_BASE_COLORS),
    toColorName: z.string().min(1, "Colour name is required"),
    toColorCode: z.string().min(1, "Colour code is required"),
    inputWeightKg: z.coerce.number().positive("Input weight must be greater than 0"),
    outputWeightKg: z.coerce.number().positive("Output weight must be greater than 0"),
    notes: z.string().optional().or(z.literal("")),
  })
  // Dyeing loses weight; it cannot create it.
  .refine((v) => Number(v.outputWeightKg) <= Number(v.inputWeightKg), {
    message: "Dyed output cannot exceed the undyed input",
    path: ["outputWeightKg"],
  });

export type ThreadPurchaseSchemaInput = z.input<typeof threadPurchaseSchema>;
export type DyeBatchSchemaInput = z.input<typeof dyeBatchSchema>;
