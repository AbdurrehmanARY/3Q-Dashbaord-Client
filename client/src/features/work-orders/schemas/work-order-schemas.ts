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
  dcNumber: z.string().optional().or(z.literal("")),
  dispatchedDate: z.string().optional().or(z.literal("")),
});

// `z.input`, not `z.infer` (= `z.output`) — the `.refine` type-guard on companyId/brandId
// narrows the *output* to non-null `number`, but RHF's form state holds the pre-validation
// shape, which is still `number | null` until submit. Mirrors `PlanLineSchemaInput`.
export type WorkOrderSchemaInput = z.input<typeof workOrderSchema>;
