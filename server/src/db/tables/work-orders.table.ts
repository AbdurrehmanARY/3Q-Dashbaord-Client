import { pgTable, serial, varchar, date, integer, timestamp, unique, text, index, pgEnum } from "drizzle-orm/pg-core";
import { brands } from "./brands.table";

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
]);

export const workOrders = pgTable(
  "work_orders",
  {
    id: serial("id").primaryKey(),
    soNumber: varchar("so_number", { length: 100 }).notNull().unique(),
    poNumber: varchar("po_number", { length: 100 }),
    orderDate: date("order_date").notNull(),
    dueDate: date("due_date"),
    totalQty: integer("total_qty").notNull(),
    brandId: integer("brand_id").references(() => brands.id),
    comment: text("comment"),
    status: workOrderStatusEnum("status").default("initiate_production").notNull(),
    /** Dispatch chalan number — required and shown only once the order is `complete`. */
    dcNumber: varchar("dc_number", { length: 100 }),
    /** Dispatch date — required and shown only once the order is `complete`. */
    dispatchedDate: date("dispatched_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    soNumberIdx: unique("work_orders_so_number_idx").on(table.soNumber),
    brandIdx: index("work_orders_brand_idx").on(table.brandId),
    statusIdx: index("work_orders_status_idx").on(table.status),
  })
);
