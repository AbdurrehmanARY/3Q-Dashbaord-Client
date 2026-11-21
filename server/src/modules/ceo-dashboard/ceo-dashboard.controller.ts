import { Request, Response } from "express";
import { asyncHandler } from "@shared/errors/asyncHandler";
import { ceoDashboardService } from "./ceo-dashboard.service";

/**
 * CEO dashboard — strictly READ-ONLY.
 *
 * Only GET handlers exist. There are no POST/PUT/DELETE/PATCH exports.
 * Read-only is enforced structurally, not via auth — see .clinerules §4.
 */
class CeoDashboardController {
  getRollStock = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ceoDashboardService.getRollStock();
    res.json({ data });
  });

  getThreadStock = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ceoDashboardService.getThreadStock();
    res.json({ data });
  });

  getWorkOrders = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ceoDashboardService.getWorkOrders();
    res.json({ data });
  });

  getProduction = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ceoDashboardService.getProductionOrders();
    res.json({ data });
  });

  getOperators = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ceoDashboardService.getOperators();
    res.json({ data });
  });

  getMachines = asyncHandler(async (_req: Request, res: Response) => {
    const data = await ceoDashboardService.getMachines();
    res.json({ data });
  });
}

export const ceoDashboardController = new CeoDashboardController();