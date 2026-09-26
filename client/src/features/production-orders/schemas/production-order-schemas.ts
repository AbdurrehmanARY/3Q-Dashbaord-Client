import { z } from "zod";

export const createProductionOrderSchema = z.object({
  // Plain + optional, refined below: an unselected Combobox hands back `undefined`, and
  // `z.coerce.number()` on `undefined` fails with zod's raw "expected number, received
  // NaN" before a custom message gets a chance to run — same fix as work-order-schemas.
  workOrderId: z
    .number()
    .int()
    .positive()
    .optional()
    .refine((v): v is number => v != null, { message: "Select a sales order" }),
  notes: z.string().optional(),
});

/** One planned size of a Size Label: `{ size: "XL", quantity: 200 }`. */
const sizePlanSchema = z.object({
  size: z.string().trim().min(1, "Size name is required"),
  quantity: z.coerce.number().int("Must be a whole number").positive("Must be > 0"),
});

/**
 * One label type. Material and the printing pair are required because submitting the
 * record reserves all three — see `production-order.service.ts` for the server twin.
 */
export const planLineSchema = z.object({
  labelType: z.string().trim().min(1, "Required"),
  quantity: z.coerce.number().positive("Must be > 0"),
  /**
   * Size Label only. The server sums these and rejects the plan unless they equal
   * `quantity`, which is what makes per-size remaining a real floor figure.
   */
  sizes: z.array(sizePlanSchema).optional(),
  labelSize: z.coerce.number().positive("Must be > 0"),
  rollLength: z.coerce.number().positive("Must be > 0"),
  extraRolls: z.coerce.number().min(0, "Cannot be negative"),
  materialCode: z.string().min(1, "Material is required"),
  assignedRolls: z.coerce.number().min(0, "Cannot be negative"),
  // Nullable so the Combobox can start empty, then refined to reject that empty state —
  // the resource has to be picked, because submitting reserves it.
  printingMachineId: z.number().int().positive().nullable().optional(),
  printingOperatorId: z.number().int().positive().nullable().optional(),
});

export type PlanLineSchemaInput = z.input<typeof planLineSchema>;
// `z.input`, not `z.infer` — see the note on `PlanLineSchemaInput` above; the `.refine`
// type-guard on `workOrderId` narrows the output to non-optional `number`, but RHF's form
// state holds the pre-validation shape until submit.
export type CreateProductionOrderSchemaInput = z.input<typeof createProductionOrderSchema>;

export const stageProgressSchema = z.object({
  completed: z.coerce.number().min(0, "Cannot be negative"),
  packagedQty: z.coerce.number().min(0, "Cannot be negative").optional(),
  note: z.string().optional(),
});

export const transferRollsSchema = z.object({
  rolls: z.coerce.number().positive("Must be > 0"),
  note: z.string().optional(),
});

export const assignResourcesSchema = z.object({
  machineId: z.coerce.number().int().positive().optional(),
  operatorId: z.coerce.number().int().positive().optional(),
});

export const issueRollsSchema = z.object({
  rolls: z.coerce.number().positive("Must be > 0"),
  note: z.string().optional(),
});

export type IssueRollsSchemaInput = z.infer<typeof issueRollsSchema>;
export type StageProgressSchemaInput = z.infer<typeof stageProgressSchema>;
export type TransferRollsSchemaInput = z.infer<typeof transferRollsSchema>;
export type AssignResourcesSchemaInput = z.infer<typeof assignResourcesSchema>;

/* ------------------------------------------------------------------ *
 * Unified multi-label-type planning (printed + woven).
 * ------------------------------------------------------------------ */

/**
 * One woven row: label type, quantity and — for a Size Label — its planned sizes. Thread
 * allocation is deliberately ABSENT: it is shared across the whole plan and lives on the
 * form, not on the row (see `utils/planning-rows.ts#allocateSharedThreads`).
 */
export const wovenPlanRowSchema = z.object({
  labelType: z.string().trim().min(1, "Select a label type"),
  quantity: z.coerce.number().positive("Qty must be > 0"),
  sizes: z.array(sizePlanSchema).optional(),
});

/** A printed row is the existing per-line schema, reused verbatim — no rule is restated. */
export const printedPlanRowSchema = planLineSchema;

/**
 * Plan-level rules shared by both workflows: at least one row, and no label type planned
 * twice in one operation (the server enforces the same rule against already-planned lines).
 */
function requireUniqueRows(
  value: { rows: { labelType?: string }[] },
  ctx: z.RefinementCtx
) {
  if (value.rows.length === 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["rows"], message: "Add at least one label type" });
  }
  const seen = new Set<string>();
  value.rows.forEach((row, index) => {
    const key = (row.labelType ?? "").trim().toLowerCase();
    if (!key) return;
    if (seen.has(key)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["rows", index, "labelType"],
        message: "Duplicate label type",
      });
    }
    seen.add(key);
  });
}

export const printedPlanFormSchema = z
  .object({ rows: z.array(printedPlanRowSchema) })
  .superRefine(requireUniqueRows);

export const wovenPlanFormSchema = z
  .object({ rows: z.array(wovenPlanRowSchema) })
  .superRefine(requireUniqueRows);

export type PrintedPlanRowSchemaInput = z.input<typeof printedPlanRowSchema>;
export type WovenPlanRowSchemaInput = z.input<typeof wovenPlanRowSchema>;
export type PrintedPlanFormInput = z.input<typeof printedPlanFormSchema>;
export type WovenPlanFormInput = z.input<typeof wovenPlanFormSchema>;
