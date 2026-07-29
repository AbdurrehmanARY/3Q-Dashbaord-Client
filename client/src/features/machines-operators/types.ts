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

export interface Operator {
  id: string;
  name: string;
  employeeCode: string | null;
  designation: string;
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
