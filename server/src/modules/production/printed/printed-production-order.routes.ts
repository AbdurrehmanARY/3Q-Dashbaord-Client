import { Router } from "express";
import { asyncHandler } from "@shared/errors/asyncHandler";
import { NotFoundError } from "@shared/errors/ApiError";
import { Messages, Entity } from "@shared/constants/messages";
import { printedProductionOrderRepository } from "./printed-production-order.repository";
import { requireProductionManager } from "@shared/middleware/rbac";

/** 
 * Printed production-order routes — mounted at /api/production/printed.
 * 
 * Read endpoints that scope to printed orders via the `printed_label_production_orders`
 * extension table join. Planning endpoints delegate to the existing printed
 * batch-flow service.
 */
const router = Router();

router.use(requireProductionManager());

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await printedProductionOrderRepository.findAll({
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
    const data = await printedProductionOrderRepository.findById(req.params.id);
    if (!data) throw new NotFoundError(Messages.notFound(Entity.PRODUCTION_ORDER));
    const lines = await printedProductionOrderRepository.findLines(req.params.id);
    res.json({ data, lines });
  })
);

router.get(
  "/:id/overview",
  asyncHandler(async (req, res) => {
    const order = await printedProductionOrderRepository.findById(req.params.id);
    if (!order) throw new NotFoundError(Messages.notFound(Entity.PRODUCTION_ORDER));
    const lines = await printedProductionOrderRepository.findLines(Number(req.params.id));
    res.json({ data: { ...order, lines } });
  })
);

export default router;
