/**
 * A sales order is a commercial header only. Label types, quantities, label size and
 * roll length are production planning and live on the production order — see
 * `features/production-orders`.
 */
/**
 * Derived from the production order, never set by hand:
 *   none -> initiate_production · planned|production -> production · complete -> complete
 */
export type WorkOrderStatus = "initiate_production" | "production" | "complete";

/** Display label + StatusBadge variant per work-order status. */
export const WORK_ORDER_STATUS_META: Record<
  WorkOrderStatus,
  { label: string; variant: "pending" | "active" | "completed" }
> = {
  initiate_production: { label: "Initiate Production", variant: "pending" },
  production: { label: "Production", variant: "active" },
  complete: { label: "Completed", variant: "completed" },
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
  status: WorkOrderStatus;
  /** Present only once the order is `complete`. */
  dcNumber: string | null;
  dispatchedDate: string | null;
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

export interface WorkOrderInput {
  soNumber: string;
  poNumber?: string;
  orderDate?: string;
  dueDate?: string;
  totalQty: number;
  brandId?: number;
  comment?: string;
  /** Dispatch paperwork, recorded once production has completed the order. */
  dcNumber?: string;
  dispatchedDate?: string;
}
