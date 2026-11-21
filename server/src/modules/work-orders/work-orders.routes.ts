import { Router } from "express";
import { workOrderController } from "./work-order.controller";
import { productionRunController } from "@modules/production/batch-and-runs/production-run.controller";
import { validateRequest, validateQuery, validateParams } from "@shared/middleware/validateRequest";
import {
  createWorkOrderSchema,
  updateWorkOrderSchema,
  dispatchWorkOrderSchema,
} from "./work-order.schema";
import {
  createProductionRunSchema,
  saleOrderParamsSchema,
} from "@modules/production/batch-and-runs/production-run.schema";
import { listWorkOrdersQuerySchema } from "@shared/validation/query.schema";
import { idParamsSchema } from "@shared/validation/common.schema";
import {
  requireWorkOrderAccess,
  requireDispatchAccess,
  requireRole,
} from "@shared/middleware/rbac";

const router = Router();

router.get("/", validateQuery(listWorkOrdersQuerySchema), requireWorkOrderAccess(), workOrderController.getWorkOrders);
router.post("/", validateRequest(createWorkOrderSchema), requireRole("office_staff", "production_manager"), workOrderController.createWorkOrder);
router.get("/:id", validateParams(idParamsSchema), requireWorkOrderAccess(), workOrderController.getWorkOrder);
router.put("/:id", validateParams(idParamsSchema), validateRequest(updateWorkOrderSchema), requireRole("office_staff", "production_manager"), workOrderController.updateWorkOrder);
router.post(
  "/:id/dispatch",
  validateParams(idParamsSchema),
  validateRequest(dispatchWorkOrderSchema),
  requireDispatchAccess(),
  workOrderController.dispatchWorkOrder
);
router.delete("/:id", validateParams(idParamsSchema), requireRole("office_staff", "production_manager"), workOrderController.deleteWorkOrder);

/* ---- Append-only production runs against a sale order ---- */
router.get(
  "/:saleOrderId/production-summary",
  validateParams(saleOrderParamsSchema),
  productionRunController.getSummary
);
router.post(
  "/:saleOrderId/production-runs",
  validateParams(saleOrderParamsSchema),
  validateRequest(createProductionRunSchema),
  productionRunController.logRun
);

export default router;
