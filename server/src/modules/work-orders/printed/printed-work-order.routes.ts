import { Router } from "express";
import { printedWorkOrderController } from "./printed-work-order.controller";
import { validateRequest, validateQuery, validateParams } from "@shared/middleware/validateRequest";
import { createPrintedWorkOrderSchema, updatePrintedWorkOrderSchema } from "./printed-work-order.schema";
import { listWorkOrdersQuerySchema } from "@shared/validation/query.schema";
import { idParamsSchema } from "@shared/validation/common.schema";
import { requireWorkOrderAccess, requireRole } from "@shared/middleware/rbac";

/**
 * Printed work-order routes — mounted at /api/work-orders/printed.
 *
 * These endpoints only ever see printed orders: the controller delegates to
 * `printedWorkOrderService`, whose repository joins `printed_label_work_orders`
 * and filters `product_type = 'printed'`.
 */
const router = Router();

router.get("/", validateQuery(listWorkOrdersQuerySchema), requireWorkOrderAccess(), printedWorkOrderController.getWorkOrders);
router.post("/", validateRequest(createPrintedWorkOrderSchema), requireRole("office_staff", "production_manager"), printedWorkOrderController.createWorkOrder);
router.get("/:id", validateParams(idParamsSchema), requireWorkOrderAccess(), printedWorkOrderController.getWorkOrder);
router.put("/:id", validateParams(idParamsSchema), validateRequest(updatePrintedWorkOrderSchema), requireRole("office_staff", "production_manager"), printedWorkOrderController.updateWorkOrder);
router.delete("/:id", validateParams(idParamsSchema), requireRole("office_staff", "production_manager"), printedWorkOrderController.deleteWorkOrder);

export default router;