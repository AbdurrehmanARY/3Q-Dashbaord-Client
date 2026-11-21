import { Router } from "express";
import { asyncHandler } from "@shared/errors/asyncHandler";
import { NotFoundError } from "@shared/errors/ApiError";
import { Messages, Entity } from "@shared/constants/messages";
import { wovenProductionOrderRepository } from "./woven-production-order.repository";
import { wovenProductionRepository } from "@modules/production/woven-production/woven-production.repository";
import { requireProductionManager } from "@shared/middleware/rbac";

/**
 * Woven production-order routes — mounted at /api/production/woven/orders.
 *
 * Read endpoints that scope to woven orders via the `woven_label_production_orders`
 * extension table join. Planning endpoints delegate to the existing woven
 * batch-flow service (which already branches on `kind: "woven"`).
 */
const router = Router();

router.use(requireProductionManager());

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await wovenProductionOrderRepository.findAll({
      status: req.query.status as string | undefined,
      soNumber: req.query.soNumber as string | undefined,
      poNumber: req.query.poNumber as string | undefined,
    });
    res.json({ data });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = await wovenProductionOrderRepository.findById(req.params.id);
    if (!data) throw new NotFoundError(Messages.notFound(Entity.PRODUCTION_ORDER));
    const lines = await wovenProductionOrderRepository.findLines(req.params.id);
    res.json({ data, lines });
  })
);

router.get(
  "/:id/overview",
  asyncHandler(async (req, res) => {
    const order = await wovenProductionOrderRepository.findById(req.params.id);
    if (!order) throw new NotFoundError(Messages.notFound(Entity.PRODUCTION_ORDER));
    const lines = await wovenProductionRepository.findLines(Number(req.params.id));
    res.json({ data: { ...order, lines } });
  })
);

export default router;