import { Router } from "express";
import { analyticsController } from "./analytics.controller";
import { requireRole } from "@shared/middleware/rbac";

const router = Router();

router.use(requireRole("ceo", "production_manager", "accountant"));

/** Dashboard KPIs. The reporting endpoints that used to sit here went with the Reports module. */
router.get("/kpis", analyticsController.getKpis);

export default router;
