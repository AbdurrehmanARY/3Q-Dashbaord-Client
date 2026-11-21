import { api } from "@/lib/api";

/**
 * CEO dashboard — read-only API service.
 *
 * Only GET methods. These correspond to the six GET-only endpoints on the
 * server's `/api/ceo` router. No POST/PUT/PATCH/DELETE here.
 */
export interface RollStockItem {
  materialCode: string;
  materialType: string;
  description: string | null;
  weightPerRoll: number;
  minStockLevel: number;
  openingStock: number;
  receivedRolls: number;
  issuedRolls: number;
  balanceRolls: number;
  rollPerKg: number;
  isLowStock: boolean;
}

export interface RollStockSummary {
  totalMaterials: number;
  totalBalanceRolls: number;
  totalIssuedRolls: number;
  lowStockCount: number;
}

export interface ThreadStockItem {
  stockType: "primary" | "secondary";
  denier: string;
  colorName: string;
  colorCode: string | null;
  balanceKg: number;
  receivedKg: number;
  consumedKg: number;
}

export interface ThreadStockSummary {
  undyedKg: number;
  dyedKg: number;
  totalKg: number;
}

export interface WorkOrderItem {
  id: number;
  soNumber: string;
  poNumber: string | null;
  orderDate: string;
  dueDate: string | null;
  totalQty: number;
  priority: string;
  orderType: string;
  status: string;
  productType: "printed" | "woven";
  brandName: string | null;
  companyName: string | null;
  createdAt: string;
}

export interface WorkOrdersSummary {
  total: number;
  byStatus: { status: string; count: number }[];
  byProductType: { productType: string; count: number }[];
}

export interface ProductionItem {
  id: number;
  productionNumber: string;
  soNumber: string;
  poNumber: string | null;
  totalQty: number;
  status: string;
  productType: "printed" | "woven";
  plannedAt: string | null;
  completedAt: string | null;
  brandName: string | null;
  companyName: string | null;
  createdAt: string;
  priority?: string;
}

export interface ProductionSummary {
  total: number;
  byStatus: { status: string; count: number }[];
  byProductType: { productType: string; count: number }[];
}

export interface OperatorItem {
  id: number;
  name: string;
  employeeCode: string | null;
  designation: string;
  operatorType: string;
  shift: string | null;
  status: string;
  isActive: boolean;
  avatarUrl: string | null;
  createdAt: string;
}

export interface OperatorUtilization {
  operatorId: number;
  operatorName: string;
  operatorDesignation: string;
  stage: string;
  batchCode: string;
  productionNumber: string;
  batchStatus: string;
  batchStartedAt: string | null;
  machineName: string | null;
}

export interface MachineItem {
  id: number;
  name: string;
  machineCode: string;
  machineName: string;
  machineType: string;
  productType: string;
  capacityPerHour: number | null;
  status: string;
  isActive: boolean;
  operatorName: string | null;
  createdAt: string;
}

export interface MachineUtilization {
  machineId: number;
  machineName: string;
  machineType: string;
  stage: string;
  batchCode: string;
  productionNumber: string;
  batchStatus: string;
  batchStartedAt: string | null;
  assignedRolls: string;
  producedRolls: string;
  operatorName: string | null;
}

export const ceoDashboardService = {
  getRollStock: () => api.get<{ data: { items: RollStockItem[]; summary: RollStockSummary } }>("/ceo/roll-stock"),
  getThreadStock: () => api.get<{ data: { items: ThreadStockItem[]; summary: ThreadStockSummary } }>("/ceo/thread-stock"),
  getWorkOrders: () => api.get<{ data: { items: WorkOrderItem[]; summary: WorkOrdersSummary } }>("/ceo/work-orders"),
  getProduction: () => api.get<{ data: { items: ProductionItem[]; summary: ProductionSummary } }>("/ceo/production"),
  getOperators: () => api.get<{ data: { items: OperatorItem[]; utilization: OperatorUtilization[] } }>("/ceo/operators"),
  getMachines: () => api.get<{ data: { items: MachineItem[]; utilization: MachineUtilization[] } }>("/ceo/machines"),
};
