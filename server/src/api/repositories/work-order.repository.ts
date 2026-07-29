import { db } from "@db/index";
import { workOrders, brands, companies } from "@db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import type { WorkOrder } from "@db/schema";

const workOrderWithBrandSelect = {
  id: workOrders.id,
  soNumber: workOrders.soNumber,
  poNumber: workOrders.poNumber,
  orderDate: workOrders.orderDate,
  dueDate: workOrders.dueDate,
  totalQty: workOrders.totalQty,
  brandId: workOrders.brandId,
  comment: workOrders.comment,
  status: workOrders.status,
  dcNumber: workOrders.dcNumber,
  dispatchedDate: workOrders.dispatchedDate,
  createdAt: workOrders.createdAt,
  updatedAt: workOrders.updatedAt,
  brandName: brands.name,
  companyId: companies.id,
  companyName: companies.name,
};

export class WorkOrderRepository {
  async findAll(filters?: {
    soNumber?: string;
    poNumber?: string;
    status?: WorkOrder["status"];
    startDate?: string;
    endDate?: string;
  }) {
    const conditions = [];
    // Partial, case-insensitive — the list filters are search boxes, not exact lookups.
    if (filters?.soNumber) conditions.push(sql`${workOrders.soNumber} ILIKE ${"%" + filters.soNumber + "%"}`);
    if (filters?.poNumber) conditions.push(sql`${workOrders.poNumber} ILIKE ${"%" + filters.poNumber + "%"}`);
    if (filters?.status) conditions.push(eq(workOrders.status, filters.status));
    if (filters?.startDate && filters?.endDate) {
      conditions.push(sql`${workOrders.orderDate} BETWEEN ${filters.startDate} AND ${filters.endDate}`);
    }

    return db
      .select(workOrderWithBrandSelect)
      .from(workOrders)
      .leftJoin(brands, eq(workOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(workOrders.createdAt));
  }

  async findById(id: number | string) {
    const [workOrder] = await db
      .select(workOrderWithBrandSelect)
      .from(workOrders)
      .leftJoin(brands, eq(workOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(workOrders.id, Number(id)));
    return workOrder;
  }

  async findRawById(id: number | string) {
    const [workOrder] = await db.select().from(workOrders).where(eq(workOrders.id, Number(id)));
    return workOrder;
  }

  async create(data: {
    soNumber: string;
    poNumber?: string;
    orderDate: string;
    dueDate?: string;
    totalQty: number;
    brandId?: number;
    comment?: string;
  }) {
    const [workOrder] = await db.insert(workOrders).values(data).returning();
    return workOrder;
  }

  async update(id: number | string, data: {
    poNumber?: string;
    dueDate?: string;
    totalQty?: number;
    brandId?: number;
    comment?: string;
    /** Derived from the production order — see production-order.repository.ts. */
    status?: WorkOrder["status"];
    dcNumber?: string | null;
    dispatchedDate?: string | null;
  }) {
    const [workOrder] = await db.update(workOrders).set({ ...data, updatedAt: new Date() }).where(eq(workOrders.id, Number(id))).returning();
    return workOrder;
  }

  async delete(id: number | string) {
    await db.delete(workOrders).where(eq(workOrders.id, Number(id)));
  }
}

export const workOrderRepository = new WorkOrderRepository();
