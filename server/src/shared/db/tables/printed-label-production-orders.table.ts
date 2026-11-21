import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { productionOrders } from "./production-orders.table";

/**
 * Printed-workflow production order extension.
 *
 * 1:1 extension of `production_orders` keyed on `production_order_id`.
 * Exists so printed-workflow reads are type-scoped without filtering on
 * `work_orders.productType`. CASCADE delete from `production_orders`.
 */
export const printedLabelProductionOrders = pgTable(
  "printed_label_production_orders",
  {
    productionOrderId: integer("production_order_id")
      .primaryKey()
      .references(() => productionOrders.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    productionOrderIdIdx: index("printed_label_production_orders_production_order_id_idx").on(
      table.productionOrderId
    ),
  })
);

export type PrintedLabelProductionOrder = typeof printedLabelProductionOrders.$inferSelect;
export type NewPrintedLabelProductionOrder = typeof printedLabelProductionOrders.$inferInsert;