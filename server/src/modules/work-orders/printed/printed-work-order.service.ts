import { printedWorkOrderRepository } from "./printed-work-order.repository";
import { productionOrderRepository } from "@modules/production/production-orders/production-order.repository";
import { ConflictError, NotFoundError } from "@shared/errors/ApiError";
import { Messages, Entity } from "@shared/constants/messages";
import type { CreatePrintedWorkOrderDTO, UpdatePrintedWorkOrderDTO } from "./printed-work-order.schema";

/**
 * Printed workflow work-order service.
 *
 * Delegates to the printed-specific repository which enforces type-scoping
 * by joining `printed_label_work_orders`. The service adds business rules:
 * SO-number uniqueness, existence checks, and production-order linkage.
 */
export class PrintedWorkOrderService {
  async getWorkOrders(filters?: {
    soNumber?: string;
    poNumber?: string;
    status?: import("@db/schema").WorkOrder["status"];
    dcNumber?: string;
    lcNumber?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return printedWorkOrderRepository.findAll(filters);
  }

  async getWorkOrder(id: number | string) {
    const workOrder = await printedWorkOrderRepository.findById(id);
    if (!workOrder) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));
    const productionOrder = await productionOrderRepository.findByWorkOrderId(id);
    return { ...workOrder, productionOrder: productionOrder ?? null };
  }

  async createWorkOrder(data: CreatePrintedWorkOrderDTO) {
    const existing = await printedWorkOrderRepository.findBySoNumber(data.soNumber);
    if (existing) throw new ConflictError(Messages.alreadyExists(Entity.WORK_ORDER));

    return printedWorkOrderRepository.create({
      soNumber: data.soNumber,
      poNumber: data.poNumber,
      orderDate: data.orderDate || new Date().toISOString().split("T")[0],
      dueDate: data.dueDate,
      totalQty: data.totalQty,
      brandId: data.brandId,
      comment: data.comment,
      imageUrl: data.imageUrl?.trim() ? data.imageUrl.trim() : null,
      dcImageUrl: data.dcImageUrl?.trim() ? data.dcImageUrl.trim() : null,
      priority: data.priority ?? "normal",
      orderType: data.orderType ?? "normal order",
    });
  }

  async updateWorkOrder(id: number | string, data: UpdatePrintedWorkOrderDTO) {
    const existing = await printedWorkOrderRepository.findById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));

    return printedWorkOrderRepository.update(id, {
      ...(data.poNumber !== undefined ? { poNumber: data.poNumber || null } : {}),
      ...(data.dueDate !== undefined ? { dueDate: data.dueDate || null } : {}),
      ...(data.totalQty !== undefined ? { totalQty: data.totalQty } : {}),
      ...(data.brandId !== undefined ? { brandId: data.brandId } : {}),
      ...(data.comment !== undefined ? { comment: data.comment || null } : {}),
      ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl ? data.imageUrl.trim() : null } : {}),
      ...(data.dcImageUrl !== undefined ? { dcImageUrl: data.dcImageUrl ? data.dcImageUrl.trim() : null } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.priority !== undefined ? { priority: data.priority } : {}),
      ...(data.orderType !== undefined ? { orderType: data.orderType } : {}),
      ...(data.dcNumber !== undefined ? { dcNumber: data.dcNumber || null } : {}),
      ...(data.lcNumber !== undefined ? { lcNumber: data.lcNumber || null } : {}),
      ...(data.fbrInvoiceNumber !== undefined ? { fbrInvoiceNumber: data.fbrInvoiceNumber || null } : {}),
      ...(data.dispatchedDate !== undefined ? { dispatchedDate: data.dispatchedDate || null } : {}),
      ...(data.dispatchedQty !== undefined ? { dispatchedQty: data.dispatchedQty } : {}),
    });
  }

  async dispatchWorkOrder(id: number | string, data: {
    dcNumber: string;
    lcNumber: string;
    fbrInvoiceNumber: string;
    dispatchedDate: string;
    dispatchedQty: number;
    imageUrl?: string | null;
    dcImageUrl?: string | null;
  }) {
    const existing = await printedWorkOrderRepository.findById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));

    if (existing.status !== "complete") {
      throw new ConflictError("Only a completed work order can be dispatched");
    }

    return printedWorkOrderRepository.update(id, {
      dcNumber: data.dcNumber,
      lcNumber: data.lcNumber,
      fbrInvoiceNumber: data.fbrInvoiceNumber,
      dispatchedDate: data.dispatchedDate,
      dispatchedQty: data.dispatchedQty,
      status: "dispatched",
      ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl || null } : {}),
      ...(data.dcImageUrl !== undefined ? { dcImageUrl: data.dcImageUrl || null } : {}),
    });
  }

  async deleteWorkOrder(id: number | string): Promise<void> {
    const existing = await printedWorkOrderRepository.findRawById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));
    await printedWorkOrderRepository.delete(id);
  }
}

export const printedWorkOrderService = new PrintedWorkOrderService();