import { wovenWorkOrderRepository } from "./woven-work-order.repository";
import { productionOrderRepository } from "@modules/production/production-orders/production-order.repository";
import { ConflictError, NotFoundError } from "@shared/errors/ApiError";
import { Messages, Entity } from "@shared/constants/messages";
import { estimateWeavingHours } from "@modules/work-orders/work-order.helpers";
import type { CreateWovenWorkOrderDTO, UpdateWovenWorkOrderDTO } from "./woven-work-order.schema";

/**
 * Woven workflow work-order service.
 *
 * The loom specification (designCode, pick, repeat, density, speed, extra,
 * sizeLabels) lives on `woven_label_work_orders` — the absorbed extension table.
 * The service computes `estimatedWeavingHours` server-side (never accepted
 * from the client) and writes both tables in a single transaction.
 */
export class WovenWorkOrderService {
  async getWorkOrders(filters?: {
    soNumber?: string;
    poNumber?: string;
    status?: import("@db/schema").WorkOrder["status"];
    designCode?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return wovenWorkOrderRepository.findAll(filters);
  }

  async getWorkOrder(id: number | string) {
    const workOrder = await wovenWorkOrderRepository.findById(id);
    if (!workOrder) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));
    const productionOrder = await productionOrderRepository.findByWorkOrderId(id);
    return { ...workOrder, productionOrder: productionOrder ?? null };
  }

  async createWorkOrder(data: CreateWovenWorkOrderDTO) {
    // Design codes identify a customer's artwork and must be unique facility-wide.
    const existingByDesign = await wovenWorkOrderRepository.findByDesignCode(data.wovenDetail.designCode);
    if (existingByDesign) {
      throw new ConflictError(`Design code '${data.wovenDetail.designCode}' is already in use`);
    }

    const totalQty = data.totalQty;
    const estimatedWeavingHours = estimateWeavingHours({
      totalQty,
      repeat: data.wovenDetail.repeat,
      pick: data.wovenDetail.pick,
      speed: data.wovenDetail.speed,
    });

    return wovenWorkOrderRepository.createWithWovenDetail(
      {
        soNumber: data.soNumber,
        poNumber: data.poNumber,
        orderDate: data.orderDate || new Date().toISOString().split("T")[0],
        dueDate: data.dueDate,
        totalQty,
        brandId: data.brandId,
        comment: data.comment,
        imageUrl: data.imageUrl?.trim() ? data.imageUrl.trim() : null,
        dcImageUrl: data.dcImageUrl?.trim() ? data.dcImageUrl.trim() : null,
        priority: data.priority ?? "normal",
        orderType: data.orderType ?? "normal order",
      },
      {
        designCode: data.wovenDetail.designCode,
        pick: data.wovenDetail.pick,
        repeat: data.wovenDetail.repeat,
        density: data.wovenDetail.density,
        speed: data.wovenDetail.speed,
        extra: data.wovenDetail.extra,
        sizeLabels: data.wovenDetail.sizeLabels,
        estimatedWeavingHours,
      }
    );
  }

  async updateWorkOrder(id: number | string, data: UpdateWovenWorkOrderDTO) {
    const existing = await wovenWorkOrderRepository.findById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));

    const commercialUpdate: Record<string, unknown> = {};
    if (data.poNumber !== undefined) commercialUpdate.poNumber = data.poNumber || null;
    if (data.dueDate !== undefined) commercialUpdate.dueDate = data.dueDate || null;
    if (data.totalQty !== undefined) commercialUpdate.totalQty = data.totalQty;
    if (data.brandId !== undefined) commercialUpdate.brandId = data.brandId;
    if (data.comment !== undefined) commercialUpdate.comment = data.comment || null;
    if (data.imageUrl !== undefined) commercialUpdate.imageUrl = data.imageUrl ? data.imageUrl.trim() : null;
    if (data.dcImageUrl !== undefined) commercialUpdate.dcImageUrl = data.dcImageUrl ? data.dcImageUrl.trim() : null;
    if (data.status !== undefined) commercialUpdate.status = data.status;
    if (data.priority !== undefined) commercialUpdate.priority = data.priority;
    if (data.orderType !== undefined) commercialUpdate.orderType = data.orderType;
    if (data.dcNumber !== undefined) commercialUpdate.dcNumber = data.dcNumber || null;
    if (data.lcNumber !== undefined) commercialUpdate.lcNumber = data.lcNumber || null;
    if (data.fbrInvoiceNumber !== undefined) commercialUpdate.fbrInvoiceNumber = data.fbrInvoiceNumber || null;
    if (data.dispatchedDate !== undefined) commercialUpdate.dispatchedDate = data.dispatchedDate || null;
    if (data.dispatchedQty !== undefined) commercialUpdate.dispatchedQty = data.dispatchedQty;

    if (Object.keys(commercialUpdate).length > 0) {
      await wovenWorkOrderRepository.update(id, commercialUpdate);
    }

    if (data.wovenDetail) {
      const detail: Record<string, unknown> = {};
      if (data.wovenDetail.designCode !== undefined) detail.designCode = data.wovenDetail.designCode;
      if (data.wovenDetail.pick !== undefined) detail.pick = data.wovenDetail.pick;
      if (data.wovenDetail.repeat !== undefined) detail.repeat = String(data.wovenDetail.repeat);
      if (data.wovenDetail.density !== undefined) detail.density = data.wovenDetail.density;
      if (data.wovenDetail.speed !== undefined) detail.speed = String(data.wovenDetail.speed);
      if (data.wovenDetail.extra !== undefined) detail.extra = String(data.wovenDetail.extra);
      if (data.wovenDetail.sizeLabels !== undefined) detail.sizeLabels = data.wovenDetail.sizeLabels;

      const loomChanged =
        data.wovenDetail.pick !== undefined ||
        data.wovenDetail.repeat !== undefined ||
        data.wovenDetail.speed !== undefined ||
        data.totalQty !== undefined;
      if (loomChanged) {
        detail.estimatedWeavingHours = Number(
          estimateWeavingHours({
            totalQty: data.totalQty ?? Number(existing.totalQty),
            repeat: data.wovenDetail.repeat ?? Number(existing.repeat ?? 0),
            pick: data.wovenDetail.pick ?? Number(existing.pick ?? 0),
            speed: data.wovenDetail.speed ?? Number(existing.speed ?? 0),
          })
        );
      }

      if (Object.keys(detail).length > 0) {
        await wovenWorkOrderRepository.updateWovenSpec(Number(id), detail);
      }
    }

    return wovenWorkOrderRepository.findById(id);
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
    const existing = await wovenWorkOrderRepository.findById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));
    if (existing.status !== "complete") {
      throw new ConflictError("Only a completed work order can be dispatched");
    }

    return wovenWorkOrderRepository.update(id, {
      dcNumber: data.dcNumber,
      lcNumber: data.lcNumber,
      fbrInvoiceNumber: data.fbrInvoiceNumber,
      dispatchedDate: data.dispatchedDate,
      dispatchedQty: data.dispatchedQty,
      status: "dispatched",
      imageUrl: data.imageUrl?.trim() ? data.imageUrl.trim() : null,
      dcImageUrl: data.dcImageUrl?.trim() ? data.dcImageUrl.trim() : null,
    });
  }

  async deleteWorkOrder(id: number | string): Promise<void> {
    const existing = await wovenWorkOrderRepository.findById(id);
    if (!existing) throw new NotFoundError(Messages.notFound(Entity.WORK_ORDER));
    await wovenWorkOrderRepository.delete(id);
  }
}

export const wovenWorkOrderService = new WovenWorkOrderService();