import { pgEnum, type pgTable } from "drizzle-orm/pg-core";

/**
 * Work order status is **derived from the production order**, never set by hand:
 *
 *   no production order            -> initiate_production  (freely editable)
 *   production order planned|production -> production      (in flight)
 *   production order complete      -> complete             (locked)
 *
 * `dcNumber` / `dispatchedDate` are dispatch paperwork captured against a completed
 * order; they no longer gate the transition, because the transition is automatic.
 */
export const workOrderStatusEnum = pgEnum("work_order_status", [
  "initiate_production",
  "production",
  "complete",
  /**
   * Goods have left the facility. Reached only by recording the dispatch paperwork
   * (DC number, LC number and FBR invoice number) against a `complete` order — it is the
   * one status that dispatch, not production, decides. Terminal: production re-syncs never
   * downgrade a dispatched order.
   */
  "dispatched",
]);

/**
 * Shared work-order interface — the common fields that both `printed_label_work_orders`
 * and `woven_label_work_orders` carry. `productType` is not a DB column on either table
 * (the table itself implies it); it is injected as a literal in queries that need it.
 *
 * Used as the canonical `WorkOrder` type across repositories and services that operate
 * on either workflow.
 */
export interface WorkOrder {
  id: number;
  soNumber: string;
  poNumber: string | null;
  orderDate: Date | string;
  dueDate: Date | string | null;
  totalQty: number;
  brandId: number | null;
  comment: string | null;
  imageUrl: string | null;
  dcImageUrl: string | null;
  status: typeof workOrderStatusEnum.enumValues[number];
  priority: string;
  orderType: string;
  dcNumber: string | null;
  lcNumber: string | null;
  fbrInvoiceNumber: string | null;
  dispatchedDate: Date | string | null;
  dispatchedQty: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  /** Injected as a literal in queries — 'printed' or 'woven'. */
  productType: "printed" | "woven";
}

/** Insertion shape — omits the auto-generated identity and timestamps. */
export type NewWorkOrder = Omit<WorkOrder, "id" | "createdAt" | "updatedAt" | "productType">;
