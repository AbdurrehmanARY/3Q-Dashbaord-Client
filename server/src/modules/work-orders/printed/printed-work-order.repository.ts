import { db } from "@db/index";
import { printedLabelWorkOrders, brands, companies } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";
import type { WorkOrder } from "@db/schema";

/**
 * Printed work-order repository.
 *
 * Queries are type-scoped: every read selects from `printed_label_work_orders`
 * directly — no `productType` column to filter on. This guarantees the printed
 * service can never accidentally surface a woven order.
 */

export interface WorkOrderRow extends WorkOrder {
  brandName?: string | null;
  companyId?: number | null;
  companyName?: string | null;
}

/**
 * The full printed work-order row: canonical columns + brand/company names.
 * `productType` is injected as a literal for UI consumers.
 */
const printedWorkOrderSelect = {
  id: printedLabelWorkOrders.id,
  soNumber: printedLabelWorkOrders.soNumber,
  poNumber: printedLabelWorkOrders.poNumber,
  orderDate: printedLabelWorkOrders.orderDate,
  dueDate: printedLabelWorkOrders.dueDate,
  totalQty: printedLabelWorkOrders.totalQty,
  brandId: printedLabelWorkOrders.brandId,
  comment: printedLabelWorkOrders.comment,
  imageUrl: printedLabelWorkOrders.imageUrl,
  dcImageUrl: printedLabelWorkOrders.dcImageUrl,
  status: printedLabelWorkOrders.status,
  priority: printedLabelWorkOrders.priority,
  orderType: printedLabelWorkOrders.orderType,
  productType: sql<"printed">`'printed'::text`,
  dcNumber: printedLabelWorkOrders.dcNumber,
  lcNumber: printedLabelWorkOrders.lcNumber,
  fbrInvoiceNumber: printedLabelWorkOrders.fbrInvoiceNumber,
  dispatchedDate: printedLabelWorkOrders.dispatchedDate,
  dispatchedQty: printedLabelWorkOrders.dispatchedQty,
  createdAt: printedLabelWorkOrders.createdAt,
  updatedAt: printedLabelWorkOrders.updatedAt,
  brandName: brands.name,
  companyId: companies.id,
  companyName: companies.name,
};

export class PrintedWorkOrderRepository {
  async findAll(filters?: {
    soNumber?: string;
    poNumber?: string;
    status?: WorkOrder["status"];
    dcNumber?: string;
    lcNumber?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<WorkOrderRow[]> {
    const conditions = [];

    if (filters?.soNumber) conditions.push(sql`"so_number" ILIKE ${"%" + filters.soNumber + "%"}`);
    if (filters?.poNumber) conditions.push(sql`"po_number" ILIKE ${"%" + filters.poNumber + "%"}`);
    if (filters?.dcNumber) conditions.push(sql`"dc_number" ILIKE ${"%" + filters.dcNumber + "%"}`);
    if (filters?.lcNumber) conditions.push(sql`"lc_number" ILIKE ${"%" + filters.lcNumber + "%"}`);
    if (filters?.status) conditions.push(eq(printedLabelWorkOrders.status, filters.status));
    if (filters?.startDate && filters?.endDate) {
      conditions.push(sql`"order_date" BETWEEN ${filters.startDate} AND ${filters.endDate}`);
    }

    return db
      .select(printedWorkOrderSelect)
      .from(printedLabelWorkOrders)
      .leftJoin(brands, eq(printedLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(conditions.length > 0 ? conditions.reduce((a, b) => sql`${a} AND ${b}`) : undefined)
      .orderBy(desc(printedLabelWorkOrders.createdAt));
  }

  async findById(id: number | string): Promise<WorkOrderRow | undefined> {
    const [row] = await db
      .select(printedWorkOrderSelect)
      .from(printedLabelWorkOrders)
      .leftJoin(brands, eq(printedLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(printedLabelWorkOrders.id, Number(id)));
    return row;
  }

  async findBySoNumber(soNumber: string): Promise<WorkOrderRow | undefined> {
    const [row] = await db
      .select(printedWorkOrderSelect)
      .from(printedLabelWorkOrders)
      .leftJoin(brands, eq(printedLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(printedLabelWorkOrders.soNumber, soNumber));
    return row;
  }

  async findRawById(id: number | string) {
    const [row] = await db
      .select()
      .from(printedLabelWorkOrders)
      .where(eq(printedLabelWorkOrders.id, Number(id)));
    return row;
  }

  /** Creates a printed sales order (all columns are on the printed table now). */
  async create(data: {
    soNumber: string;
    poNumber?: string;
    orderDate: string;
    dueDate?: string;
    totalQty: number;
    brandId?: number;
    comment?: string;
    imageUrl?: string | null;
    dcImageUrl?: string | null;
    priority?: string;
    orderType?: string;
  }) {
    const [row] = await db
      .insert(printedLabelWorkOrders)
      .values({
        ...data,
        poNumber: data.poNumber ?? null,
        dueDate: data.dueDate ?? null,
        brandId: data.brandId ?? null,
        comment: data.comment ?? null,
        imageUrl: data.imageUrl ?? null,
        dcImageUrl: data.dcImageUrl ?? null,
        priority: data.priority ?? "normal",
        orderType: data.orderType ?? "normal order",
      })
      .returning();
    return row;
  }

  async update(id: number | string, data: Partial<{
    poNumber: string | null;
    dueDate: string | null;
    totalQty: number;
    brandId: number | null;
    comment: string | null;
    imageUrl: string | null;
    dcImageUrl: string | null;
    status: WorkOrder["status"];
    priority: string;
    orderType: string;
    dcNumber: string | null;
    lcNumber: string | null;
    fbrInvoiceNumber: string | null;
    dispatchedDate: string | null;
    dispatchedQty: number | null;
    updatedAt: Date;
  }>) {
    const [row] = await db
      .update(printedLabelWorkOrders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(printedLabelWorkOrders.id, Number(id)))
      .returning();
    return row;
  }

  async delete(id: number | string) {
    await db
      .delete(printedLabelWorkOrders)
      .where(eq(printedLabelWorkOrders.id, Number(id)));
  }
}

export const printedWorkOrderRepository = new PrintedWorkOrderRepository();