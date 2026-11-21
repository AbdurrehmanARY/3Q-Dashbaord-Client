import { Router } from "express";
import { wovenWorkOrderController } from "./woven-work-order.controller";
import { validateRequest, validateQuery, validateParams } from "@shared/middleware/validateRequest";
import { createWovenWorkOrderSchema, updateWovenWorkOrderSchema } from "./woven-work-order.schema";
import { listWorkOrdersQuerySchema } from "@shared/validation/query.schema";
import { idParamsSchema } from "@shared/validation/common.schema";
import { requireWorkOrderAccess, requireRole } from "@shared/middleware/rbac";

/**
 * Woven work-order routes — mounted at /api/work-orders/woven.
 *
 * These endpoints only ever see woven orders: the controller delegates to
 * `wovenWorkOrderService`, whose repository joins `woven_label_work_orders`
 * (absorbing the loom spec) and filters `product_type = 'woven'`.
 */
const router = Router();

router.get("/", validateQuery(listWorkOrdersQuerySchema), requireWorkOrderAccess(), wovenWorkOrderController.getWorkOrders);
router.post("/", validateRequest(createWovenWorkOrderSchema), requireRole("office_staff", "production_manager"), wovenWorkOrderController.createWorkOrder);
router.get("/:id", validateParams(idParamsSchema), requireWorkOrderAccess(), wovenWorkOrderController.getWorkOrder);
router.put("/:id", validateParams(idParamsSchema), validateRequest(updateWovenWorkOrderSchema), requireRole("office_staff", "production_manager"), wovenWorkOrderController.updateWorkOrder);
router.delete("/:id", validateParams(idParamsSchema), requireRole("office_staff", "production_manager"), wovenWorkOrderController.deleteWorkOrder);

export default router;