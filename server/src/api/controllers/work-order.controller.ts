import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { workOrderService } from "../services/work-order.service";
import type { CreateWorkOrderDTO, UpdateWorkOrderDTO } from "../validations/work-orders.validation";
import type { ListWorkOrdersQueryDTO } from "../validations/query.validation";

class WorkOrderController {
  getWorkOrders = asyncHandler(async (req: Request, res: Response) => {
    const { soNumber, poNumber, status, startDate, endDate } = (req.validatedQuery ?? req.query) as ListWorkOrdersQueryDTO;
    const data = await workOrderService.getWorkOrders({
      soNumber,
      poNumber,
      status,
      startDate,
      endDate,
    });
    res.json({ data });
  });

  getWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    const data = await workOrderService.getWorkOrder(id);
    res.json({ data });
  });

  createWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const input = (req.validatedBody ?? req.body) as CreateWorkOrderDTO;
    const data = await workOrderService.createWorkOrder(input);
    res.status(201).json({ data });
  });

  updateWorkOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = (req.validatedParams ?? req.params) as { id: string };
      const input = (req.validatedBody ?? req.body) as UpdateWorkOrderDTO;
      const data = await workOrderService.updateWorkOrder(id, input);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  deleteWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    await workOrderService.deleteWorkOrder(id);
    res.status(204).send();
  });
}

export const workOrderController = new WorkOrderController();
