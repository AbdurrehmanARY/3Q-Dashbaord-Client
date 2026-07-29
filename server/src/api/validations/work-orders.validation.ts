import { z } from "zod";

/**
 * A sales order carries only its commercial header. The label-type breakdown
 * (label type, quantity, label size, roll length) belongs to the production order
 * and is entered by the production manager during planning.
 */
export const createWorkOrderSchema = z.object({
  body: z.object({
    soNumber: z.string().min(1, "SO Number is required"),
    poNumber: z.string().optional(),
    orderDate: z.string().optional(),
    dueDate: z.string().optional(),
    totalQty: z.coerce.number().int().positive("Total quantity must be greater than 0"),
    brandId: z.coerce.number().int().positive("Brand ID must be a positive integer").optional(),
    comment: z.string().optional(),
  }),
});

export const updateWorkOrderSchema = z.object({
  body: z.object({
    poNumber: z.string().optional(),
    dueDate: z.string().optional(),
    totalQty: z.coerce.number().int().positive().optional(),
    brandId: z.coerce.number().int().positive().optional(),
    comment: z.string().optional(),
    // `status` is deliberately absent: it is derived from the production order and can
    // never be set through this endpoint.
    dcNumber: z.string().optional(),
    dispatchedDate: z.string().optional(),
  }),
});

export type CreateWorkOrderDTO = z.infer<typeof createWorkOrderSchema>['body'];
export type UpdateWorkOrderDTO = z.infer<typeof updateWorkOrderSchema>['body'];
