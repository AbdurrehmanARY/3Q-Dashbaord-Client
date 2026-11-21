import { sql } from "drizzle-orm";
import { pgTable, serial, integer, varchar, text, timestamp, index, pgEnum } from "drizzle-orm/pg-core";
import { printedLabelWorkOrders } from "./printed-label-work-orders.table";
import { wovenLabelWorkOrders } from "./woven-label-work-orders.table";
import { users } from "./users.table";

/**
 * Three automatic states, derived from roll progress (never set by hand):
 *   planned    — created/planned, no production started yet
 *   production — any printing/cutting/packaging has begun
 *   complete   — every label type fully packaged
 */
export const productionOrderStatusEnum = pgEnum("production_order_status", [
  "planned",
  "production",
  "complete",
]);

/**
 * A production run raised by Office Staff against a submitted (approved) sales order.
 *
 * The sales order is the link between the two sides of the workflow: a production
 * order carries no company/brand/customer of its own — those are always derived via
 * the work-order table's brand link.
 *
 * `printedWorkOrderId` / `wovenWorkOrderId` are mutually exclusive (one is set, the
 * other is NULL), mirroring the pattern on `production_batches`. The CHECK
 * constraint `production_orders_one_work_order` enforces this at the DB level.
 */
export const productionOrders = pgTable(
  "production_orders",
  {
    id: serial("id").primaryKey(),
    productionNumber: varchar("production_number", { length: 100 }).notNull().unique(),
    printedWorkOrderId: integer("printed_work_order_id").references(() => printedLabelWorkOrders.id, {
      onDelete: "restrict",
    }),
    wovenWorkOrderId: integer("woven_work_order_id").references(() => wovenLabelWorkOrders.id, {
      onDelete: "restrict",
    }),
    totalQty: integer("total_qty").notNull(),
    status: productionOrderStatusEnum("status").default("planned").notNull(),
    notes: text("notes"),
    createdByUserId: integer("created_by_user_id").references(() => users.id),
    plannedAt: timestamp("planned_at"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    printedWorkOrderIdx: index("production_orders_printed_work_order_idx").on(table.printedWorkOrderId),
    wovenWorkOrderIdx: index("production_orders_woven_work_order_idx").on(table.wovenWorkOrderId),
    statusIdx: index("production_orders_status_idx").on(table.status),
    /** Exactly one of the two workflow FKs must be set. */
    oneWorkOrderCheck: sql`CHECK (num_nonnulls(${table.printedWorkOrderId}, ${table.wovenWorkOrderId}) = 1)`,
  })
);
