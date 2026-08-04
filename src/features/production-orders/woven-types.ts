import type { ThreadDenier } from "@/features/thread";

/** One planned thread colour on a woven line. Up to 8 per line. */
export interface WovenThread {
  id: number;
  sortOrder: number;
  colorName: string;
  denier: ThreadDenier;
  colorCode: string;
  weightKg: number;
  threadStockId?: number | null;
  remainingWeightKg?: number;
  actualConsumedWeightKg?: number;
}

export interface WovenLineOverview {
  id: number;
  quantity: number;
  status: "pending" | "active" | "paused" | "completed" | "cancelled";
  planning: {
    /** Summed server-side from the thread colours — never client-supplied. */
    totalThreadWeightKg: number;
    completedAt: string | null;
    threadCount: number;
    threads: WovenThread[];
  };
  weaving: {
    machineId: number | null;
    machineName: string | null;
    operatorId: number | null;
    operatorName: string | null;
    wovenQty: number;
    status: string;
    startedAt: string | null;
    endedAt: string | null;
    progressPct: number;
    isComplete: boolean;
  };
  cutting: {
    operatorId: number | null;
    operatorName: string | null;
    cutQty: number;
    cuttingDate: string | null;
    /** False until weaving is 100% complete. */
    canStart: boolean;
    isComplete: boolean;
  };
  packaging: {
    operatorId: number | null;
    operatorName: string | null;
    packagedQty: number;
    packagedWeightKg: number;
    packagingDate: string | null;
    /** False until cut quantity equals woven quantity. */
    canStart: boolean;
    isComplete: boolean;
  };
}

export interface WovenOverview {
  productionOrder: {
    productionOrderId: number;
    productionNumber: string;
    status: string;
    totalQty: number;
    workOrderId: number;
    soNumber: string;
    productType: string;
  };
  lines: WovenLineOverview[];
  totals: {
    lineCount: number;
    quantity: number;
    totalThreadWeightKg: number;
    wovenQty: number;
    cutQty: number;
    packagedQty: number;
    packagedWeightKg: number;
  };
}

export interface ThreadPlanInput {
  colorName: string;
  denier: ThreadDenier;
  colorCode: string;
  weightKg: number;
  threadStockId?: number | null;
}

export interface PlanWovenInput {
  quantity: number;
  weavingMachineId: number;
  weavingOperatorId: number;
  threads: ThreadPlanInput[];
}

export interface WeavingInput {
  wovenQty?: number;
  started?: boolean;
  ended?: boolean;
}

export interface WovenCuttingInput {
  cutQty?: number;
  cuttingOperatorId?: number;
  cuttingDate?: string;
}

export interface WovenPackagingInput {
  packagedQty?: number;
  packagedWeightKg?: number;
  packagingOperatorId?: number;
  packagingDate?: string;
}
