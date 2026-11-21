import { Request, Response } from "express";
import { asyncHandler } from "@shared/errors/asyncHandler";
import { wovenWorkOrderService } from "./woven-work-order.service";
import type {
  CreateWovenWorkOrderDTO,
  UpdateWovenWorkOrderDTO,
} from "./woven-work-order.schema";
import type { ListWorkOrdersQueryDTO } from "@shared/validation/query.schema";

class WovenWorkOrderController {
  getWorkOrders = asyncHandler(async (req: Request, res: Response) => {
    const query = (req.validatedQuery ?? req.query) as ListWorkOrdersQueryDTO;
    const data = await wovenWorkOrderService.getWorkOrders({
      soNumber: query.soNumber,
      poNumber: query.poNumber,
      status: query.status,
      designCode: query.designCode,
      startDate: query.startDate,
      endDate: query.endDate,
    });
    res.json({ data });
  });

  getWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    const data = await wovenWorkOrderService.getWorkOrder(id);
    res.json({ data });
  });

  createWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const input = (req.validatedBody ?? req.body) as CreateWovenWorkOrderDTO;
    const data = await wovenWorkOrderService.createWorkOrder(input);
    res.status(201).json({ data });
  });

  updateWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    const input = (req.validatedBody ?? req.body) as UpdateWovenWorkOrderDTO;
    const data = await wovenWorkOrderService.updateWorkOrder(id, input);
    res.json({ data });
  });

  deleteWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    await wovenWorkOrderService.deleteWorkOrder(id);
    res.status(204).send();
  });
}

export const wovenWorkOrderController = new WovenWorkOrderController();