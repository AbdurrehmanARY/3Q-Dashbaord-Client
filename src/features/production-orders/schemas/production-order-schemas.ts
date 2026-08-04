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

/**
 * One label type. Material and the printing pair are required because submitting the
 * record reserves all three — see `production-order.service.ts` for the server twin.
 */
export const planLineSchema = z.object({
  labelType: z.string().trim().min(1, "Required"),
  quantity: z.coerce.number().positive("Must be > 0"),
  labelSize: z.coerce.number().positive("Must be > 0"),
  extraRolls: z.coerce.number().min(0, "Cannot be negative"),
  materialCode: z.string().min(1, "Material is required"),
  assignedRolls: z.coerce.number().min(0, "Cannot be negative"),
  // Nullable so the Combobox can start empty, then refined to reject that empty state —
  // the resource has to be picked, because submitting reserves it.
  printingMachineId: z
    .number()
    .int()
    .positive()
    .nullable()
    .refine((v): v is number => v != null, { message: "Printing machine is required" }),
  printingOperatorId: z
    .number()
    .int()
    .positive()
    .nullable()
    .refine((v): v is number => v != null, { message: "Printing operator is required" }),
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
