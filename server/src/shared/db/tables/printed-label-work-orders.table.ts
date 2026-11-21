import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  text,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { brands } from "./brands.table";
import { workOrderStatusEnum } from "./work-orders.table";

/**
 * Printed-workflow work order — standalone table (promoted from the 0029 extension).
 *
 * Carries the full sales-order header: SO/PO numbers, dates, quantity, brand link,
 * artwork image, status, dispatch paperwork and timestamps. No loom specification —
 * that data lives only on `woven_label_work_orders`.
 *
 * `productType` is implied by the table name; queries inject a `'printed'` literal
 * where a discriminator column is needed.
 */
export const printedLabelWorkOrders = pgTable(
  "printed_label_work_orders",
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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    soNumberIdx: unique("printed_label_work_orders_so_number_idx").on(table.soNumber),
    brandIdx: index("printed_label_work_orders_brand_idx").on(table.brandId),
    statusIdx: index("printed_label_work_orders_status_idx").on(table.status),
    // Dispatch paperwork is searchable, so both numbers get an index.
    dcNumberIdx: index("printed_label_work_orders_dc_number_idx").on(table.dcNumber),
    lcNumberIdx: index("printed_label_work_orders_lc_number_idx").on(table.lcNumber),
    fbrInvoiceIdx: index("printed_label_work_orders_fbr_invoice_idx").on(table.fbrInvoiceNumber),
  })
);

export type PrintedLabelWorkOrder = typeof printedLabelWorkOrders.$inferSelect;
export type NewPrintedLabelWorkOrder = typeof printedLabelWorkOrders.$inferInsert;