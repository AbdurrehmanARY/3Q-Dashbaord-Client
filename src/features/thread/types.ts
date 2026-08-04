/** The four thread weights the facility purchases. Used as the item code on receiving. */
export const THREAD_DENIERS = ["45", "75", "100", "150"] as const;
export type ThreadDenier = (typeof THREAD_DENIERS)[number];

/** Undyed thread is only ever bought in these two colours. */
export const THREAD_BASE_COLORS = ["White", "Black"] as const;
export type ThreadBaseColor = (typeof THREAD_BASE_COLORS)[number];

/**
 * Two stock pools:
 *   primary   — undyed thread as purchased (e.g. 100 kg White 75D)
 *   secondary — dyed thread from the dyeing process (e.g. 20 kg Brown 22783 75D)
 */
export type ThreadStockType = "primary" | "secondary";

export interface ThreadStock {
  id: number;
  stockType: ThreadStockType;
  denier: ThreadDenier;
  colorName: string;
  /** Dye lot code — null for undyed primary stock. */
  colorCode: string | null;
  balanceKg: number;
  receivedKg: number;
  consumedKg: number;
  createdAt: string;
  updatedAt: string;
}

export interface ThreadStockSummary {
  primary: ThreadStock[];
  secondary: ThreadStock[];
  totals: {
    primaryKg: number;
    secondaryKg: number;
    primaryCount: number;
    secondaryCount: number;
  };
}

export type ThreadMovementType =
  | "purchase_receipt"
  | "dye_consume"
  | "dye_produce"
  | "production_issue"
  | "production_release"
  | "adjustment";

export interface ThreadMovement {
  id: number;
  threadStockId: number;
  movementType: ThreadMovementType;
  /** Signed: positive credits the stock, negative debits it. */
  weightKg: number;
  balanceAfterKg: number;
  referenceType: string | null;
  referenceId: number | null;
  note: string | null;
  createdAt: string;
}

export const MOVEMENT_LABELS: Record<ThreadMovementType, string> = {
  purchase_receipt: "Received",
  dye_consume: "Dyed (out)",
  dye_produce: "Dyed (in)",
  production_issue: "Issued to production",
  production_release: "Returned from production",
  adjustment: "Adjustment",
};

export interface ThreadPurchase {
  id: number;
  receivedDate: string;
  itemName: string;
  denier: ThreadDenier;
  threadColor: ThreadBaseColor;
  vendor: string;
  invoiceNumber: string;
  totalCtns: number;
  weightPerCtnKg: number;
  /** Server-calculated: weightPerCtnKg × totalCtns. */
  totalWeightKg: number;
  notes: string | null;
  createdAt: string;
}

export interface ThreadPurchaseInput {
  receivedDate: string;
  denier: ThreadDenier;
  threadColor: ThreadBaseColor;
  vendor: string;
  invoiceNumber: string;
  totalCtns: number;
  weightPerCtnKg: number;
  notes?: string;
}

export interface DyeBatch {
  id: number;
  batchNumber: string;
  fromStockId: number;
  toStockId: number;
  denier: ThreadDenier;
  colorName: string;
  colorCode: string;
  inputWeightKg: number;
  outputWeightKg: number;
  notes: string | null;
  createdAt: string;
}

export interface DyeBatchInput {
  denier: ThreadDenier;
  fromColorName: ThreadBaseColor;
  toColorName: string;
  toColorCode: string;
  inputWeightKg: number;
  outputWeightKg: number;
  notes?: string;
}

/** Creating or editing a thread ledger by hand. Balance changes record an adjustment. */
export interface ThreadStockInput {
  stockType?: ThreadStockType;
  denier?: ThreadDenier;
  colorName?: string;
  colorCode?: string | null;
  openingKg?: number;
  balanceKg?: number;
  note?: string;
}
