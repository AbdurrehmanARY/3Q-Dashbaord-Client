import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  text,
  timestamp,
  numeric,
  jsonb,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { brands } from "./brands.table";
import { workOrderStatusEnum } from "./work-orders.table";

/**
 * Woven-workflow work order — standalone table (promoted from the 0029 extension,
 * absorbing the former `woven_work_order_details` 1:1 table).
 *
 * Carries the full sales-order header (identical to `printed_label_work_orders`)
 * plus the woven-only loom specification: designCode, pick, repeat, density,
 * speed, extra, estimatedWeavingHours and sizeLabels.
 *
 * `productType` is implied by the table name; queries inject a `'woven'` literal
 * where a discriminator column is needed.
 *
 * `estimatedWeavingHours` is **server-calculated** on create/update (see
 * `woven-work-order.helpers.ts` — actually `work-order.helpers.ts`), never accepted
 * from the client.
 */
export const wovenLabelWorkOrders = pgTable(
  "woven_label_work_orders",
  {
    id: serial("id").primaryKey(),
    soNumber: varchar("so_number", { length: 100 }).notNull().unique(),
    poNumber: varchar("po_number", { length: 100 }),
    orderDate: date("order_date").notNull(),
    dueDate: date("due_date"),
    totalQty: integer("total_qty").notNull(),
    brandId: integer("brand_id").references(() => brands.id),
    comment: text("comment"),
    /**
     * Artwork / reference image for the order, rendered on the detail page. Plain URL text
     * today; a Cloudinary-hosted URL would drop in here unchanged.
     */
    imageUrl: text("image_url"),
    /**
     * DC-copy image captured alongside the artwork during dispatch (0028).
     * Same pattern as imageUrl: plain text holding a base64 data URI or URL.
     */
    dcImageUrl: text("dc_image_url"),
    status: workOrderStatusEnum("status").default("initiate_production").notNull(),
    /**
     * Scheduling priority, set by office staff on any order (woven or printed).
     * Stored as a plain varchar (not a pg enum) so the value set is easy to extend —
     * validated to `normal | urgent | emergency` by the Zod schema. Default `normal`.
     */
    priority: varchar("priority", { length: 20 }).default("normal").notNull(),
    /**
     * Why this order exists. Validated to
     * `normal order | shortfall | additional order | recut order`. Default `normal order`.
     */
    orderType: varchar("order_type", { length: 30 }).default("normal order").notNull(),
    /** Dispatch chalan number — required to complete dispatch, and searchable. */
    dcNumber: varchar("dc_number", { length: 100 }),
    /** Letter-of-credit number — required to complete dispatch, and searchable. */
    lcNumber: varchar("lc_number", { length: 100 }),
    /** FBR (tax authority) invoice number — required to complete dispatch, and searchable. */
    fbrInvoiceNumber: varchar("fbr_invoice_number", { length: 100 }),
    /** Dispatch date — captured against a completed order. */
    dispatchedDate: date("dispatched_date"),
    /** Quantity actually dispatched; may differ from `totalQty` on a short shipment. */
    dispatchedQty: integer("dispatched_qty"),
    /* ---------- Woven-only loom specification (absorbed from woven_work_order_details) ---------- */
    /** Customer-facing design identifier, e.g. "Guess 13R". Unique across the facility. */
    designCode: varchar("design_code", { length: 100 }).notNull().unique(),
    /** Weft picks per unit, e.g. 853. */
    pick: integer("pick").notNull(),
    /** Design repeat length, e.g. 60. */
    repeat: numeric("repeat", { precision: 12, scale: 2 }).notNull(),
    /** Warp density, e.g. 560. */
    density: integer("density").notNull(),
    /** Loom speed in RPM, e.g. 500 RPM. */
    speed: numeric("speed", { precision: 12, scale: 2 }).default("0").notNull(),
    /** Extra allowance added on top of the ordered quantity, e.g. 150. */
    extra: numeric("extra", { precision: 12, scale: 2 }).default("0").notNull(),
    /**
     * Derived figure: hours to weave the whole order at the loom speed.
     * Formula: (totalQty / repeat) * pick / (speed * 60), rounded to 2dp,
     * speed defaulting to 600 RPM when unset/0.
     * Computed server-side, never accepted from the client.
     */
    estimatedWeavingHours: numeric("estimated_weaving_hours", { precision: 12, scale: 2 })
      .default("0")
      .notNull(),
    /** Size labels woven on this order, e.g. ["10", "12", "XL", "34/34"]. */
    sizeLabels: jsonb("size_labels").$type<string[]>().default([]).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    soNumberIdx: unique("woven_label_work_orders_so_number_idx").on(table.soNumber),
    brandIdx: index("woven_label_work_orders_brand_idx").on(table.brandId),
    statusIdx: index("woven_label_work_orders_status_idx").on(table.status),
    designCodeIdx: index("woven_label_work_orders_design_code_idx").on(table.designCode),
    dcNumberIdx: index("woven_label_work_orders_dc_number_idx").on(table.dcNumber),
    lcNumberIdx: index("woven_label_work_orders_lc_number_idx").on(table.lcNumber),
    fbrInvoiceIdx: index("woven_label_work_orders_fbr_invoice_idx").on(table.fbrInvoiceNumber),
  })
);

export type WovenLabelWorkOrder = typeof wovenLabelWorkOrders.$inferSelect;
export type NewWovenLabelWorkOrder = typeof wovenLabelWorkOrders.$inferInsert;