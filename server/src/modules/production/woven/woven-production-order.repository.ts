import { db } from "@db/index";
import {
  productionOrders,
  wovenLabelProductionOrders,
  productionOrderLines,
  wovenLabelWorkOrders,
  brands,
  companies,
} from "@db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

/**
 * Woven production-order repository.
 *
 * Queries join `woven_label_production_orders` (the woven extension) to
 * scope reads: only production orders whose parent work order is `product_type = 'woven'`
 * are ever returned.
 */

const wovenProductionOrderSelect = {
  id: productionOrders.id,
  productionNumber: productionOrders.productionNumber,
  workOrderId: productionOrders.wovenWorkOrderId,
  totalQty: productionOrders.totalQty,
  status: productionOrders.status,
  notes: productionOrders.notes,
  createdByUserId: productionOrders.createdByUserId,
  plannedAt: productionOrders.plannedAt,
  completedAt: productionOrders.completedAt,
  createdAt: productionOrders.createdAt,
  updatedAt: productionOrders.updatedAt,
  soNumber: wovenLabelWorkOrders.soNumber,
  poNumber: wovenLabelWorkOrders.poNumber,
  orderDate: wovenLabelWorkOrders.orderDate,
  dueDate: wovenLabelWorkOrders.dueDate,
  priority: wovenLabelWorkOrders.priority,
  brandName: brands.name,
  companyName: companies.name,
};

export class WovenProductionOrderRepository {
  async findAll(filters?: { status?: string; soNumber?: string; poNumber?: string }) {
    const conditions = [];

    if (filters?.status) conditions.push(eq(productionOrders.status, filters.status as any));
    if (filters?.soNumber) conditions.push(sql`${wovenLabelWorkOrders.soNumber} ILIKE ${"%" + filters.soNumber + "%"}`);
    if (filters?.poNumber) conditions.push(sql`${wovenLabelWorkOrders.poNumber} ILIKE ${"%" + filters.poNumber + "%"}`);

    return db
      .select(wovenProductionOrderSelect)
      .from(productionOrders)
      .leftJoin(wovenLabelProductionOrders, eq(wovenLabelProductionOrders.productionOrderId, productionOrders.id))
      .innerJoin(wovenLabelWorkOrders, eq(wovenLabelWorkOrders.id, productionOrders.wovenWorkOrderId))
      .leftJoin(brands, eq(brands.id, wovenLabelWorkOrders.brandId))
      .leftJoin(companies, eq(companies.id, brands.companyId))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(productionOrders.createdAt));
  }

  async findById(id: number | string) {
    const [row] = await db
      .select(wovenProductionOrderSelect)
      .from(productionOrders)
      .leftJoin(wovenLabelProductionOrders, eq(wovenLabelProductionOrders.productionOrderId, productionOrders.id))
      .leftJoin(wovenLabelWorkOrders, eq(wovenLabelWorkOrders.id, productionOrders.wovenWorkOrderId))
      .leftJoin(brands, eq(brands.id, wovenLabelWorkOrders.brandId))
      .leftJoin(companies, eq(companies.id, brands.companyId))
      .where(eq(productionOrders.id, Number(id)));
    return row;
  }

  async findLines(productionOrderId: number | string) {
    return db
      .select()
      .from(productionOrderLines)
      .where(eq(productionOrderLines.productionOrderId, Number(productionOrderId)))
      .orderBy(productionOrderLines.id);
  }
}

export const wovenProductionOrderRepository = new WovenProductionOrderRepository();