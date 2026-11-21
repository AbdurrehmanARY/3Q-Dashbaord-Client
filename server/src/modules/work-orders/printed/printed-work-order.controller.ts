import { Request, Response } from "express";
import { asyncHandler } from "@shared/errors/asyncHandler";
import { printedWorkOrderService } from "./printed-work-order.service";
import type {
  CreatePrintedWorkOrderDTO,
  UpdatePrintedWorkOrderDTO,
} from "./printed-work-order.schema";
import type { ListWorkOrdersQueryDTO } from "@shared/validation/query.schema";

class PrintedWorkOrderController {
  getWorkOrders = asyncHandler(async (req: Request, res: Response) => {
    const query = (req.validatedQuery ?? req.query) as ListWorkOrdersQueryDTO;
    const data = await printedWorkOrderService.getWorkOrders({
      soNumber: query.soNumber,
      poNumber: query.poNumber,
      status: query.status,
      dcNumber: query.dcNumber,
      lcNumber: query.lcNumber,
      startDate: query.startDate,
      endDate: query.endDate,
    });
    res.json({ data });
  });

  getWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    const data = await printedWorkOrderService.getWorkOrder(id);
    res.json({ data });
  });

  createWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const input = (req.validatedBody ?? req.body) as CreatePrintedWorkOrderDTO;
    const data = await printedWorkOrderService.createWorkOrder(input);
    res.status(201).json({ data });
  });

  updateWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    const input = (req.validatedBody ?? req.body) as UpdatePrintedWorkOrderDTO;
    const data = await printedWorkOrderService.updateWorkOrder(id, input);
    res.json({ data });
  });

  deleteWorkOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = (req.validatedParams ?? req.params) as { id: string };
    await printedWorkOrderService.deleteWorkOrder(id);
    res.status(204).send();
  });
}

export const printedWorkOrderController = new PrintedWorkOrderController();