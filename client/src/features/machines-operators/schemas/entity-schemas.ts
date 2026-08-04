import { z } from "zod";

export const MACHINE_TYPES = ["Printing", "Cutting", "Packaging", "Other"] as const;
export const DESIGNATIONS = ["Printing", "Cutting", "Packaging"] as const;
export const SHIFTS = ["Morning", "Evening", "Night"] as const;
export const ENTITY_STATUSES = ["Active", "Inactive"] as const;

export const machineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  machineCode: z.string().min(1, "Machine code is required"),
  machineName: z.string().min(1, "Machine name is required"),
  machineType: z.string().min(1, "Machine type is required"),
  // An empty number input reads as `NaN` (not `undefined`) via RHF's `valueAsNumber`, and
  // `NaN` still fails `z.coerce.number()`'s base check even under `.optional()` — coercing
  // it back to `undefined` first is what lets "left blank" actually mean "not provided".
  capacityPerHour: z.preprocess(
    (v) => (typeof v === "number" && Number.isNaN(v) ? undefined : v),
    z.coerce.number().int().min(0).optional()
  ),
  status: z.string().default("Active"),
});

export const operatorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  employeeCode: z.string().optional().or(z.literal("")),
  designation: z.string().min(1, "Designation is required"),
  /** Which product line they can work. Defaults to `both` — the widest, safest default. */
  operatorType: z.enum(["printed", "woven", "both"]).default("both"),
  // Validated as a URL only when non-empty, so leaving it blank clears the avatar rather
  // than failing validation.
  avatarUrl: z.string().trim().url("Enter a valid image URL").or(z.literal("")).optional(),
  shift: z.string().optional().or(z.literal("")),
  status: z.string().default("Active"),
});

export type MachineSchemaInput = z.infer<typeof machineSchema>;
export type OperatorSchemaInput = z.infer<typeof operatorSchema>;
