import { z } from "zod";
import { artworkImageSchema } from "@modules/work-orders/work-order.schema";
import { WORK_ORDER_PRIORITIES, WORK_ORDER_TYPES } from "@modules/work-orders/work-order.schema";

/**
 * Printed work-order schemas.
 *
 * `productType` is hardcoded to `"printed"` — these endpoints will never accept
 * a woven order. The loom-specification fields (`wovenDetail`) are explicitly
 * rejected.
 */

export const createPrintedWorkOrderSchema = z.object({
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
    /** Hard-coded: the printed workflow never accepts a woven spec. */
    productType: z.literal("printed").default("printed"),
    /** Rejected on printed orders — the schema strips it so the service never sees it. */
    wovenDetail: z.undefined().optional(),
  }),
});

export const updatePrintedWorkOrderSchema = z.object({
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
    /** Rejected on printed orders. */
    wovenDetail: z.undefined().optional(),
  }),
});

export type CreatePrintedWorkOrderDTO = z.infer<typeof createPrintedWorkOrderSchema>["body"];
export type UpdatePrintedWorkOrderDTO = z.infer<typeof updatePrintedWorkOrderSchema>["body"];