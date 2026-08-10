export type ProductionOrderStatus = "planned" | "production" | "complete";

export type ProductionLineStatus = "pending" | "active" | "paused" | "completed" | "cancelled";

export type ProductionStage = "printing" | "cutting" | "packaging";
export type TransferTarget = "cutting" | "packaging";

export type UserRole = "office_staff" | "production_manager" | "production_operator";

export interface User {
  id: number;
  name: string;
  employeeCode: string | null;
  email: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** A submitted sales order that does not yet have a production order raised against it. */
export interface EligibleSalesOrder {
  id: number;
  soNumber: string;
  poNumber: string | null;
  orderDate: string;
  dueDate: string | null;
  totalQty: number;
  productType: "printed" | "woven";
  brandId: number | null;
  brandName: string | null;
  companyId: number | null;
  companyName: string | null;
}

/** List/detail row — sales order fields come from the join, not from the production order itself. */
export interface ProductionOrder {
  id: number;
  productionNumber: string;
  workOrderId: number;
  totalQty: number;
  plannedQty?: number;
  unplannedQty?: number;
  status: ProductionOrderStatus;
  notes: string | null;
  createdByUserId: number | null;
  plannedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  soNumber: string;
  poNumber: string | null;
  orderDate: string;
  dueDate: string | null;
  salesOrderQty: number;
  productType?: "printed" | "woven";
  priority?: string;
  machineName?: string | null;
  brandId: number | null;
  brandName: string | null;
  companyId: number | null;
  companyName: string | null;
  estimatedWeavingHours?: number | null;
}

/** Raw line row. Every decimal arrives from Postgres as a string — convert before arithmetic. */
export interface ProductionOrderLine {
  id: number;
  productionOrderId: number;
  labelType: string;
  quantity: string;
  labelSize: string;
  rollLength: string;
  requiredRolls: string;
  extraRolls: string;
  totalRolls: string;
  materialCode: string | null;
  issuedRolls: string;
  printedRolls: string;
  sentToCuttingRolls: string;
  cutRolls: string;
  sentToPackagingRolls: string;
  packagedRolls: string;
  packagedQty: string;
  printingMachineId: number | null;
  printingOperatorId: number | null;
  cuttingMachineId: number | null;
  cuttingOperatorId: number | null;
  packagingOperatorId: number | null;
  usedRolls?: string;
  usedWeight?: string;
  extraRollsReturned?: string;
  extraWeight?: string;
  reconciledAt?: string | null;
  status: ProductionLineStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductionOrderDetail extends ProductionOrder {
  lines: ProductionOrderLine[];
}

/* ---------- Overview (dashboard) — the server pre-converts these to numbers ---------- */

export interface LinePlanning {
  quantity: number;
  labelSize: number;
  rollLength: number;
  requiredRolls: number;
  extraRolls: number;
  totalRolls: number;
  totalWeight: number;
  printingMachineId: number | null;
  printingOperatorId: number | null;
}

/** Material detail is echoed back with the line so the floor can verify the selection. */
export interface LineMaterial {
  materialCode: string | null;
  description: string | null;
  materialType: string | null;
  weightPerRoll: number | null;
  /** Rolls drawn from inventory for this line — the manual "Assigned Rolls" figure. */
  assignedRolls: number;
  issuedRolls: number;
  /** Planned rolls not yet drawn from inventory. */
  pendingIssue: number;
  assignedWeight: number | null;
}

/** Workflow steps 3-5: production is blocked until material + printing crew are set. */
export interface LineReadiness {
  canStart: boolean;
  missing: string[];
}

export interface LinePrinting {
  machineId: number | null;
  machineName: string | null;
  operatorId: number | null;
  operatorName: string | null;
  /** Avatar of the operator who ran this stage. */
  operatorAvatarUrl: string | null;
  printedRolls: number;
  progressPct: number;
  /** Stamped when printing first reached the planned roll count; null while in progress. */
  completedAt: string | null;
}

export interface LineCutting {
  machineId: number | null;
  machineName: string | null;
  operatorId: number | null;
  operatorName: string | null;
  operatorAvatarUrl: string | null;
  sentToCuttingRolls: number;
  cutRolls: number;
  progressPct: number;
  completedAt: string | null;
}

export interface LinePackaging {
  operatorId: number | null;
  operatorName: string | null;
  operatorAvatarUrl: string | null;
  sentToPackagingRolls: number;
  packagedRolls: number;
  packagedQty: number;
  progressPct: number;
  completedAt: string | null;
}

export interface LineLiveProgress {
  totalRolls: number;
  printedRolls: number;
  unprintedRolls?: number;
  waitingForCutting: number;
  sentToCuttingRolls: number;
  cutRolls: number;
  inCuttingProcess?: number;
  waitingForPackaging: number;
  sentToPackagingRolls: number;
  packagedRolls: number;
  inPackagingProcess?: number;
  completionPct: number;
}

export interface LineReconciliation {
  usedRolls: number;
  usedWeight: number;
  extraRollsReturned: number;
  extraWeight: number;
  reconciledAt: string | null;
}

export interface ReconcileInput {
  usedRolls: number;
  usedWeight: number;
  extraRollsReturned: number;
  extraWeight: number;
}

export interface ProductionLineOverview {
  id: number;
  labelType: string;
  status: ProductionLineStatus;
  notes: string | null;
  readiness: LineReadiness;
  planning: LinePlanning;
  material: LineMaterial;
  printing: LinePrinting;
  cutting: LineCutting;
  packaging: LinePackaging;
  reconciliation?: LineReconciliation;
  liveProgress: LineLiveProgress;
}

export interface ProductionOrderHeader {
  id: number;
  productionNumber: string;
  workOrderId: number;
  soNumber: string;
  poNumber: string | null;
  companyId: number | null;
  companyName: string | null;
  /** The customer is the company that owns the brand; both resolve to the same name. */
  customer: string | null;
  /** Which workflow this order runs — the dashboard renders printed or woven accordingly. */
  productType: "printed" | "woven";
  brandId: number | null;
  brandName: string | null;
  totalQty: number;
  status: ProductionOrderStatus;
  orderDate: string;
  dueDate: string | null;
  notes: string | null;
  plannedAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

export interface ProductionOrderTotals {
  labelTypeCount: number;
  plannedQty: number;
  unplannedQty: number;
  packagedQty: number;
  requiredRolls: number;
  extraRolls: number;
  totalRolls: number;
  totalWeight: number;
  assignedRolls: number;
  assignedWeight: number;
  issuedRolls: number;
  pendingIssue: number;
  printedRolls: number;
  unprintedRolls?: number;
  sentToCuttingRolls: number;
  cutRolls: number;
  inCuttingProcess?: number;
  sentToPackagingRolls: number;
  packagedRolls: number;
  inPackagingProcess?: number;
  waitingForCutting: number;
  waitingForPackaging: number;
  completionPct: number;
}

export interface ProductionOrderOverview {
  productionOrder: ProductionOrderHeader;
  lines: ProductionLineOverview[];
  totals: ProductionOrderTotals;
}

/* ---------- Audit trail ---------- */

export type ProductionEventType =
  | "printing_progress"
  | "transfer_to_cutting"
  | "cutting_progress"
  | "transfer_to_packaging"
  | "packaging_progress"
  | "assignment"
  | "row_update";

export interface ProductionStageEvent {
  id: number;
  productionOrderLineId: number;
  labelType?: string;
  eventType: ProductionEventType;
  previousValue: string | null;
  newValue: string | null;
  delta: string | null;
  actorUserId: number | null;
  note: string | null;
  createdAt: string;
}

/* ---------- Request payloads ---------- */

export interface CreateProductionOrderInput {
  workOrderId: number;
  notes?: string;
  createdByUserId?: number;
}

/**
 * One label type, planned on its own. Material and the printing pair are required
 * because submitting the record reserves all three.
 */
export interface PlanLineInput {
  labelType: string;
  quantity: number;
  labelSize: number;
  rollLength?: number;
  extraRolls?: number;
  materialCode: string;
  /** Manual figure — drawn from inventory when the record is submitted. */
  assignedRolls?: number;
  printingMachineId: number;
  printingOperatorId: number;
  notes?: string;
  actorUserId?: number;
}

/** Machines and operators not already held by another active production job. */
export interface AvailableResources {
  machines: { id: number; name: string; machineType: string }[];
  operators: { id: number; name: string; designation: string }[];
  lockedMachineIds: number[];
  lockedOperatorIds: number[];
}

export type MachineAvailability = "Available" | "Reserved" | "In Production" | "Maintenance";
export type OperatorAvailability = "Available" | "Assigned" | "Working" | "Completed";

/** Live availability decorated onto every machine/operator list response. */
export interface ResourceAvailability {
  isOccupied: boolean;
  /** Where it is committed, e.g. "PRD-00003 · Care Label". Null when free. */
  heldBy: string | null;
}

export interface ProductionRollIssuance {
  id: number;
  productionOrderLineId: number;
  materialCode: string;
  rolls: string;
  note: string | null;
  actorUserId: number | null;
  createdAt: string;
}

export interface IssueRollsInput {
  materialCode?: string;
  rolls: number;
  note?: string;
  actorUserId?: number;
}

export interface AssignResourcesInput {
  stage: ProductionStage;
  machineId?: number | null;
  operatorId?: number | null;
  actorUserId?: number;
}

export interface StageProgressInput {
  completed: number;
  packagedQty?: number;
  note?: string;
  actorUserId?: number;
}

export interface TransferRollsInput {
  target: TransferTarget;
  rolls: number;
  note?: string;
  actorUserId?: number;
}

/**
 * Full inline row edit for the Production Progress table: any subset of the five roll
 * counters, the packaged label quantity, and the five machine/operator assignments, all
 * in one atomic save. Every field is an absolute value, not a delta.
 */
export interface UpdateLineFullInput {
  printedRolls?: number;
  sentToCuttingRolls?: number;
  cutRolls?: number;
  sentToPackagingRolls?: number;
  packagedRolls?: number;
  packagedQty?: number;
  materialCode?: string;
  printingMachineId?: number | null;
  printingOperatorId?: number | null;
  cuttingMachineId?: number | null;
  cuttingOperatorId?: number | null;
  packagingOperatorId?: number | null;
  status?: ProductionLineStatus;
  note?: string;
  actorUserId?: number;
}
