/**
 * Machines and operators carry a live `availability` derived server-side from the
 * production lines currently holding them — nothing is stored on the record itself, so
 * finishing or cancelling a line frees the resource with no extra step.
 */
export type MachineAvailability = "Available" | "Reserved" | "In Production" | "Maintenance";
export type OperatorAvailability = "Available" | "Assigned" | "Working" | "Completed";

export interface Machine {
  id: string;
  name: string;
  machineCode: string;
  machineName: string;
  machineType: string;
  productType: OperatorType;
  machineOperatorId?: string | null;
  capacityPerHour: number | null;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  availability: MachineAvailability;
  /** Reserved / In Production / Maintenance machines cannot take another job. */
  isOccupied: boolean;
  /** Where it is committed, e.g. "PRD-00003 · Care Label". Null when free. */
  heldBy: string | null;
}

/**
 * Which product line an operator is trained for — distinct from `designation`, which is
 * the stage they work. Production pickers offer the line's own type plus `both`.
 */
export type OperatorType = "printed" | "woven" | "both";

export const OPERATOR_TYPES: OperatorType[] = ["printed", "woven", "both"];

export const OPERATOR_TYPE_META: Record<
  OperatorType,
  { label: string; description: string; variant: "pending" | "active" | "info" }
> = {
  printed: { label: "Printed", description: "Printed labels only", variant: "pending" },
  woven: { label: "Woven", description: "Woven labels only", variant: "active" },
  both: { label: "Both", description: "Works either product line", variant: "info" },
};

export interface Operator {
  id: string;
  name: string;
  employeeCode: string | null;
  designation: string;
  operatorType: OperatorType;
  /** Plain image URL; the UI falls back to initials when absent or broken. */
  avatarUrl: string | null;
  shift: string | null;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  availability: OperatorAvailability;
  /** Assigned / Working operators cannot take another job. */
  isOccupied: boolean;
  heldBy: string | null;
}
