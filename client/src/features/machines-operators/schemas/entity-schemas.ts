import { z } from "zod";

export const MACHINE_TYPES = ["Printing", "Woven", "Cutting", "Packaging", "Other"] as const;
export const DESIGNATIONS = ["Printing", "Weaving", "Cutting", "Packaging"] as const;
export const SHIFTS = ["Morning", "Evening", "Night"] as const;
export const ENTITY_STATUSES = ["Active", "Inactive"] as const;

export const machineSchema = z.object({
  name: z.string().optional(),
  machineCode: z.string().min(1, "Machine code is required"),
  machineName: z.string().min(1, "Machine name is required"),
  machineType: z.string().min(1, "Machine type is required"),
  /** Which product line the machine is built for: printed / woven / both. Defaults to `both`. */
  productType: z.enum(["printed", "woven", "both"]).default("both"),
  status: z.string().default("Active"),
});

export const operatorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  employeeCode: z.string().optional().or(z.literal("")),
  designation: z.string().min(1, "Designation is required"),
  /** Which product line they can work. Defaults to `both` — the widest, safest default. */
  operatorType: z.enum(["printed", "woven", "both"]).default("both"),
  avatarUrl: z.string().trim().optional().or(z.literal("")),
  shift: z.string().optional().or(z.literal("")),
  status: z.string().default("Active"),
});

export type MachineSchemaInput = z.infer<typeof machineSchema>;
export type OperatorSchemaInput = z.infer<typeof operatorSchema>;
