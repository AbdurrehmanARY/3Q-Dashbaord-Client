import { z } from "zod";

/**
 * Header only — the label-type breakdown is entered by the production manager on the
 * production order, not here.
 *
 * There is no `status` field: work order status is derived from the production order
 * (none -> Initiate Production, planned/production -> Production, complete -> Completed)
 * and is never submitted by the client. DC Number and Dispatched Date are dispatch
 * paperwork recorded once production has finished the order, so they are always optional.
 */
export const workOrderSchema = z.object({
  soNumber: z.string().min(1, "SO Number is required"),
  poNumber: z.string().optional().or(z.literal("")),
  orderDate: z.string().min(1, "Order date is required"),
  dueDate: z.string().optional().or(z.literal("")),
  totalQty: z.coerce.number().positive("Total quantity must be positive"),
  // Plain (not coerce) + nullable: the Combobox hands back `number | null`, and an unset
  // selection must fail on the friendly refine message below rather than on zod's raw
  // "expected number, received NaN" — which is what `z.coerce.number()` produces when it
  // tries to coerce a missing value before any custom message gets a chance to run.
  companyId: z
    .number()
    .nullable()
    .refine((v): v is number => v != null, { message: "Please select a company" }),
  brandId: z
    .number()
    .nullable()
    .refine((v): v is number => v != null, { message: "Please select a brand" }),
  comment: z.string().optional().or(z.literal("")),
  priority: z.enum(["normal", "urgent", "emergency"]).default("normal"),
  orderType: z.enum(["normal order", "shortfall", "additional order", "recut order"]).default("normal order"),
  // Accepts an uploaded image (base64 data URI) or an external URL; empty clears it.
  imageUrl: z
    .string()
    .trim()
    .max(4_000_000, "Image is too large — keep it under about 3 MB")
    .refine(
      (v) => v === "" || v.startsWith("data:image/") || /^https?:\/\/.+/i.test(v),
      "Upload an image or enter a valid image URL"
    )
    .optional(),
  productType: z.enum(["printed", "woven"]).default("printed"),
  /* ---- Woven loom spec. Only required when productType is "woven" (see superRefine). ---- */
  designCode: z.string().optional().or(z.literal("")),
  pick: z.union([z.coerce.number(), z.literal("")]).optional(),
  repeat: z.union([z.coerce.number(), z.literal("")]).optional(),
  density: z.union([z.coerce.number(), z.literal("")]).optional(),
  speed: z.union([z.coerce.number(), z.literal("")]).optional(),
  extra: z.union([z.coerce.number(), z.literal("")]).optional(),
  dcNumber: z.string().optional().or(z.literal("")),
  lcNumber: z.string().optional().or(z.literal("")),
  fbrInvoiceNumber: z.string().optional().or(z.literal("")),
  dispatchedDate: z.string().optional().or(z.literal("")),
  dispatchedQty: z.union([z.coerce.number(), z.literal("")]).optional(),
});

/**
 * One schema for both workflows — the woven loom fields are declared optional above and
 * made mandatory here only when `productType` is "woven". Keeping it in a single schema
 * (rather than two) is what lets the same dialog serve both product types.
 */
export const workOrderFormSchema = workOrderSchema.superRefine((v, ctx) => {
  if (v.productType !== "woven") return;
  const required = [
    ["designCode", v.designCode, "Design code is required"],
    ["pick", v.pick, "Pick is required"],
    ["repeat", v.repeat, "Repeat is required"],
    ["density", v.density, "Density is required"],
  ] as const;
  for (const [path, value, message] of required) {
    if (value === "" || value === undefined || value === null || Number.isNaN(value)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
    }
  }
});

// `z.input`, not `z.infer` (= `z.output`) — the `.refine` type-guard on companyId/brandId
// narrows the *output* to non-null `number`, but RHF's form state holds the pre-validation
// shape, which is still `number | null` until submit. Mirrors `PlanLineSchemaInput`.
export type WorkOrderSchemaInput = z.input<typeof workOrderSchema>;

/** Dispatch completion — both paperwork numbers and optional artwork image. */
export const dispatchSchema = z.object({
  dcNumber: z.string().min(1, "DC Number is required"),
  lcNumber: z.string().min(1, "LC Number is required"),
  fbrInvoiceNumber: z.string().min(1, "FBR Invoice Number is required"),
  dispatchedDate: z.string().min(1, "Dispatch date is required"),
  dispatchedQty: z.coerce.number().positive("Dispatch quantity must be greater than 0"),
  imageUrl: z
    .string()
    .trim()
    .max(4_000_000, "Image is too large — keep it under about 3 MB")
    .refine(
      (v) => v === "" || v.startsWith("data:image/") || /^https?:\/\/.+/i.test(v),
      "Upload an image or enter a valid image URL"
    )
    .optional(),
});

export type DispatchSchemaInput = z.input<typeof dispatchSchema>;
