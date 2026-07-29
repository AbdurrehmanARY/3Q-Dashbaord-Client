import { workOrderRepository } from "../repositories/work-order.repository";
import { productionOrderRepository } from "../repositories/production-order.repository";
import { ApiError, ConflictError, NotFoundError } from "../utils/ApiError";
import { Messages, Entity } from "../constants/messages";

/**
 * Sales orders are a commercial header only — SO/PO number, dates, brand and a total
 * quantity. Breaking that quantity into label types is production planning, and lives
 * on the production order (see production-order.service.ts).
 */
export class WorkOrderService {
  async getWorkOrders(filters?: { soNumber?: string; poNumber?: string; status?: "initiate_production" | "production" | "complete"; startDate?: string; endDate?: string }) {
    return workOrderRepository.findAll(filters);
  }

  async getWorkOrder(id: number | string) {
    const workOrder = await workOrderRepository.findById(id);
    if (!workOrder) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));
    // Surfaced so the UI can link a sales order to the production run raised against it.
    const productionOrder = await productionOrderRepository.findByWorkOrderId(id);
    return { ...workOrder, productionOrder: productionOrder ?? null };
  }

  async createWorkOrder(data: {
    soNumber: string;
    poNumber?: string;
    orderDate?: string;
    dueDate?: string;
    totalQty: number;
    brandId?: number;
    comment?: string;
  }) {
    const existing = await workOrderRepository.findAll({ soNumber: data.soNumber });
    if (existing.length > 0) {
      throw new ConflictError(Messages.alreadyExists(Entity.WORK_ORDER));
    }
    return workOrderRepository.create({
      soNumber: data.soNumber,
      poNumber: data.poNumber,
      orderDate: data.orderDate || new Date().toISOString().split("T")[0],
      dueDate: data.dueDate,
      totalQty: data.totalQty,
      brandId: data.brandId,
      comment: data.comment,
    });
  }

  /**
   * Commercial fields only. **Status is never accepted from the client** — it is derived
   * from the production order (see production-order.repository.ts), so a `status` key in
   * the payload is ignored rather than honoured.
   *
   * A completed work order is locked apart from its dispatch paperwork: DC number and
   * dispatched date are recorded *after* production finishes it, so they have to stay
   * writable once it is complete.
   */
  async updateWorkOrder(id: number | string, data: {
    poNumber?: string;
    dueDate?: string;
    totalQty?: number;
    brandId?: number;
    comment?: string;
    dcNumber?: string;
    dispatchedDate?: string;
  }) {
    const existing = await workOrderRepository.findRawById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));

    const { dcNumber, dispatchedDate, ...commercial } = data;

    if (existing.status === "complete" && Object.keys(commercial).length > 0) {
      throw new ApiError(
        "This work order is complete — only the DC number and dispatched date can still be edited",
        400
      );
    }

    // Once a production order exists, the quantity it was raised against is fixed.
    if (data.totalQty !== undefined && data.totalQty !== existing.totalQty) {
      const productionOrder = await productionOrderRepository.findByWorkOrderId(id);
      if (productionOrder) {
        throw new ApiError(
          `Cannot change quantity: production order ${productionOrder.productionNumber} was raised against this work order`,
          400
        );
      }
    }

    return workOrderRepository.update(id, {
      ...commercial,
      ...(dcNumber !== undefined ? { dcNumber } : {}),
      ...(dispatchedDate !== undefined ? { dispatchedDate } : {}),
    });
  }

  async deleteWorkOrder(id: number | string): Promise<void> {
    const existing = await workOrderRepository.findRawById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));
    if (existing.status !== "initiate_production") {
      throw new ApiError("Cannot delete a work order that is already in production", 400);
    }

    // `production_orders.work_order_id` is ON DELETE RESTRICT — surface that as a clear
    // 400 rather than letting the FK violation surface as a 500.
    const productionOrder = await productionOrderRepository.findByWorkOrderId(id);
    if (productionOrder) {
      throw new ApiError(
        `Cannot delete this sales order: production order ${productionOrder.productionNumber} was raised against it`,
        400
      );
    }

    await workOrderRepository.delete(id);
  }
}

export const workOrderService = new WorkOrderService();
