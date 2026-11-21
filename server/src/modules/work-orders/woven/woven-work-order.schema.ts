import { z } from "zod";
import { artworkImageSchema, WORK_ORDER_PRIORITIES, WORK_ORDER_TYPES, wovenDetailSchema } from "@modules/work-orders/work-order.schema";

/**
 * Woven work-order schemas.
 *
 * `productType` is hardcoded to `"woven"` and `wovenDetail` is REQUIRED.
 * The loom specification is written to the `woven_label_work_orders` extension
 * table (absorbing the former `woven_work_order_details`), so creating a woven
 * order is a single two-table transaction.
 */

export const createWovenWorkOrderSchema = z.object({
  body: z.object({
    soNumber: z.string().min(1, "SO Number is required"),
    poNumber: z.string().optional(),
    orderDate: z.string().optional(),
    dueDate: z.string().optional(),
    totalQty: z.coerce.number().int().positive("Total quantity must be greater than 0"),
    brandId: z.coerce.number().int().positive("Brand ID must be a positive integer").optional(),
    comment: z.string().optional(),
    priority: z.enum(WORK_ORDER_PRIORITIES).default("normal"),
    orderType: z.enum(WORK_ORDER_TYPES).default("normal order"),
    imageUrl: artworkImageSchema,
    dcImageUrl: artworkImageSchema,
    /** Hard-coded: the woven workflow. */
    productType: z.literal("woven").default("woven"),
    /** Required for woven orders. */
    wovenDetail: wovenDetailSchema,
  }),
});

export const updateWovenWorkOrderSchema = z.object({
  body: z.object({
    poNumber: z.string().optional(),
    dueDate: z.string().optional(),
    totalQty: z.coerce.number().int().positive().optional(),
    brandId: z.coerce.number().int().positive().optional(),
    comment: z.string().optional(),
    priority: z.enum(WORK_ORDER_PRIORITIES).optional(),
    orderType: z.enum(WORK_ORDER_TYPES).optional(),
    imageUrl: artworkImageSchema,
    dcImageUrl: artworkImageSchema,
    status: z.enum(["initiate_production", "production", "complete", "dispatched"]).optional(),
    dcNumber: z.string().optional(),
    lcNumber: z.string().optional(),
    fbrInvoiceNumber: z.string().optional(),
    dispatchedDate: z.string().optional(),
    dispatchedQty: z.coerce.number().int().positive().optional(),
    /** Loom-spec edits — partial update of the woven extension. */
    wovenDetail: wovenDetailSchema.partial().optional(),
  }),
});

export type CreateWovenWorkOrderDTO = z.infer<typeof createWovenWorkOrderSchema>["body"];
export type UpdateWovenWorkOrderDTO = z.infer<typeof updateWovenWorkOrderSchema>["body"];