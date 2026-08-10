export type RunReason =
  | "initial"
  | "shortfall"
  | "additional_order"
  | "recut"
  | "rework"
  | "retry"
  | "other";

export const RUN_REASONS: RunReason[] = [
  "initial",
  "shortfall",
  "additional_order",
  "recut",
  "rework",
  "retry",
  "other",
];

export const RUN_REASON_LABELS: Record<RunReason, string> = {
  initial: "Initial",
  shortfall: "Shortfall",
  additional_order: "Additional Order",
  recut: "Recut",
  rework: "Rework",
  retry: "Retry",
  other: "Other",
};

export interface ProductionRun {
  id: string;
  saleOrderId: number;
  productId: string | null;
  machineId: number | null;
  machineName: string | null;
  operatorId: number | null;
  operatorName: string | null;
  quantityProduced: string;
  runReason: RunReason;
  notes: string | null;
  producedAt: string;
  createdBy: number | null;
  createdByName: string | null;
  createdAt: string;
}

export interface MachineBreakdown {
  machineId: number | null;
  machineName: string | null;
  totalQuantity: string;
  runCount: number;
}

export interface OperatorBreakdown {
  operatorId: number | null;
  operatorName: string | null;
  totalQuantity: string;
  runCount: number;
}

export interface ProductionSummary {
  saleOrderId: number;
  soNumber: string;
  orderedQuantity: number;
  totalProduced: number;
  remainingQuantity: number;
  history: ProductionRun[];
  machineHistory: MachineBreakdown[];
  operatorHistory: OperatorBreakdown[];
}

export interface LogProductionRunInput {
  productId?: string;
  machineId?: number;
  operatorId?: number;
  quantityProduced: number;
  runReason: RunReason;
  notes?: string;
  idempotencyKey?: string;
}
