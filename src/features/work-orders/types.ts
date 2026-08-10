/**
 * A sales order is a commercial header only. Label types, quantities, label size and
 * roll length are production planning and live on the production order — see
 * `features/production-orders`.
 */
/**
 * Derived from the production order, never set by hand:
 *   none -> initiate_production · planned|production -> production · complete -> complete
 */
export type WorkOrderStatus = "initiate_production" | "production" | "complete" | "dispatched";

/**
 * Which manufacturing workflow the order runs through. Both share Company / Brand / PO /
 * SO / Quantity; woven orders additionally carry a loom specification.
 *
 *   printed — Printing -> Cutting -> Packaging -> Dispatch
 *   woven   — Planning -> Weaving -> Cutting -> Packaging -> Dispatch
 */
export type ProductType = "printed" | "woven";

export const PRODUCT_TYPE_META: Record<ProductType, { label: string; description: string }> = {
  printed: { label: "Printed Labels", description: "Printing → Cutting → Packaging" },
  woven: { label: "Woven Labels", description: "Planning → Weaving → Cutting → Packaging" },
};

/** Scheduling priority — set on any order, defaults to `normal`. */
export type WorkOrderPriority = "normal" | "urgent" | "emergency";
export const WORK_ORDER_PRIORITIES: WorkOrderPriority[] = ["normal", "urgent", "emergency"];
export const WORK_ORDER_PRIORITY_META: Record<
  WorkOrderPriority,
  { label: string; variant: "neutral" | "warning" | "error" }
> = {
  normal: { label: "Normal", variant: "neutral" },
  urgent: { label: "Urgent", variant: "warning" },
  emergency: { label: "Emergency", variant: "error" },
};

/** Why the order exists — defaults to `normal order`. */
export type WorkOrderType = "normal order" | "shortfall" | "additional order" | "recut order";
export const WORK_ORDER_TYPES: WorkOrderType[] = ["normal order", "shortfall", "additional order", "recut order"];
export const WORK_ORDER_TYPE_META: Record<WorkOrderType, { label: string }> = {
  "normal order": { label: "Normal Order" },
  shortfall: { label: "Shortfall" },
  "additional order": { label: "Additional Order" },
  "recut order": { label: "Recut Order" },
};

/** Display label + StatusBadge variant per work-order status. */
export const WORK_ORDER_STATUS_META: Record<
  WorkOrderStatus,
  { label: string; variant: "pending" | "active" | "completed" | "info" }
> = {
  initiate_production: { label: "Initiate Production", variant: "pending" },
  production: { label: "Production", variant: "active" },
  complete: { label: "Completed", variant: "completed" },
  /** Terminal — reached by filling in DC, LC and FBR invoice numbers. */
  dispatched: { label: "Dispatched", variant: "info" },
};

export interface WorkOrder {
  id: string;
  soNumber: string;
  poNumber: string | null;
  orderDate: string;
  dueDate: string | null;
  totalQty: number;
  brandId: number | null;
  brandName: string | null;
  companyId: number | null;
  companyName: string | null;
  comment: string | null;
  priority: WorkOrderPriority;
  orderType: WorkOrderType;
  /** Artwork / reference image URL, previewed on the detail page. */
  imageUrl: string | null;
  status: WorkOrderStatus;
  productType: ProductType;
  /** Dispatch paperwork — recorded once production has completed the order. */
  dcNumber: string | null;
  lcNumber: string | null;
  fbrInvoiceNumber: string | null;
  dispatchedDate: string | null;
  dispatchedQty: number | null;
  /* ---- Woven loom spec: populated only when productType is "woven" ---- */
  designCode: string | null;
  pick: number | null;
  /** Decimal columns arrive from Postgres as strings — convert before arithmetic. */
  repeat: string | null;
  density: number | null;
  speed: string | number | null;
  extra: string | null;
  sizeLabels?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

/** The production run raised against a sales order, if any. */
export interface LinkedProductionOrder {
  id: number;
  productionNumber: string;
  status: string;
  totalQty: number;
}

export interface WorkOrderDetail extends WorkOrder {
  productionOrder: LinkedProductionOrder | null;
}

/** The loom specification carried by a woven order. */
export interface WovenDetailInput {
  designCode: string;
  pick: number;
  repeat: number;
  density: number;
  speed?: number;
  extra?: number;
  sizeLabels?: string[];
}

export interface WorkOrderInput {
  soNumber: string;
  poNumber?: string;
  orderDate?: string;
  dueDate?: string;
  totalQty: number;
  brandId?: number;
  comment?: string;
  priority?: WorkOrderPriority;
  orderType?: WorkOrderType;
  imageUrl?: string;
  productType?: ProductType;
  /** Required when `productType` is "woven". */
  wovenDetail?: WovenDetailInput;
  /** Dispatch paperwork, recorded once production has completed the order. */
  dcNumber?: string;
  lcNumber?: string;
  fbrInvoiceNumber?: string;
  dispatchedDate?: string;
  dispatchedQty?: number;
}

/**
 * Completing dispatch. All three paperwork numbers are mandatory — filling them in is what
 * moves the order to `dispatched`.
 */
export interface DispatchInput {
  dcNumber: string;
  lcNumber: string;
  fbrInvoiceNumber: string;
  dispatchedDate: string;
  dispatchedQty: number;
  imageUrl?: string;
}
