/**
 * The former `woven_work_order_details` 1:1 table has been absorbed into
 * `woven_label_work_orders` (see migration 0030). Its columns now live as
 * NOT NULL fields directly on the woven label work-orders table.
 *
 * This file is kept as a tombstone so that historical `import` references
 * to `./tables/woven-work-order-details.table` do not break; it exports nothing.
 */
export {};
