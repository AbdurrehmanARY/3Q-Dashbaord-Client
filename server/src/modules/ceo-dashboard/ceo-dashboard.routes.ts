import { Router } from "express";
import { ceoDashboardController } from "./ceo-dashboard.controller";
import { requireRole } from "@shared/middleware/rbac";

/**
 * CEO dashboard routes — mounted at /api/ceo.
 *
 * READ-ONLY: every route is a GET. The controller exports no mutation handlers;
 * any POST/PUT/DELETE/PATCH to these paths returns 404.
 */
const router = Router();

router.use(requireRole("ceo", "accountant", "production_manager"));

router.get("/roll-stock", ceoDashboardController.getRollStock);
router.get("/thread-stock", ceoDashboardController.getThreadStock);
router.get("/work-orders", ceoDashboardController.getWorkOrders);
router.get("/production", ceoDashboardController.getProduction);
router.get("/operators", ceoDashboardController.getOperators);
router.get("/machines", ceoDashboardController.getMachines);

export default router;