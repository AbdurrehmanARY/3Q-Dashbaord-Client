import type { ThreadDenier } from "@/features/thread";
import type { SizePlan } from "./label-types";

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
  labelType: string;
  id: number;
  quantity: number;
  /** Planned sizes of a Size Label line — drives the per-size batch tracking. */
  sizes: SizePlan[];
  status: "pending" | "active" | "paused" | "completed" | "cancelled";
  planning: {
    /** Summed server-side from the thread colours — never client-supplied. */
    totalThreadWeightKg: number;
    completedAt: string | null;
    threadCount: number;
    /** Dyed thread this label type actually consumed. */
    dyedThreadUsedKg: number;
    /**
     * Beam thread: packaged weight − dyed thread consumed. Server-calculated, never
     * client-supplied. Signed — a negative figure means consumption exceeded packaged
     * weight, which is information rather than an error.
     */
    beamThreadKg: number;
    threads: WovenThread[];
  };
  weaving: {
            wovenQty: number;
    status: string;
    startedAt: string | null;
    endedAt: string | null;
    progressPct: number;
    isComplete: boolean;
    speedRpm?: number;
    estimatedWeavingHours?: number;
    actualWeavingHours?: number;
    weavingTimeDiffHours?: number;
  };
  cutting: {
        cutQty: number;
    cuttingDate: string | null;
    /** False until weaving is 100% complete. */
    canStart: boolean;
    isComplete: boolean;
  };
  packaging: {
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
    dyedThreadUsedKg: number;
    /** Σ beam thread across every label type. */
    beamThreadKg: number;
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
  /** One woven line per label type, exactly like the printed side. */
  labelType: string;
  quantity: number;
  /** Planned sizes — required by a Size Label and summed to `quantity`. */
  sizes?: SizePlan[];
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
