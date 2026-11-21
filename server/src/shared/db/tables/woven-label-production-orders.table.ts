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
 * Woven-workflow production order extension.
 *
 * 1:1 extension of `production_orders` keyed on `production_order_id`.
 * Exists so woven-workflow reads are type-scoped without filtering on
 * `work_orders.productType`. CASCADE delete from `production_orders`.
 */
export const wovenLabelProductionOrders = pgTable(
  "woven_label_production_orders",
  {
    productionOrderId: integer("production_order_id")
      .primaryKey()
      .references(() => productionOrders.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    productionOrderIdIdx: index("woven_label_production_orders_production_order_id_idx").on(
      table.productionOrderId
    ),
  })
);

export type WovenLabelProductionOrder = typeof wovenLabelProductionOrders.$inferSelect;
export type NewWovenLabelProductionOrder = typeof wovenLabelProductionOrders.$inferInsert;