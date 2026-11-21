import { db } from "@db/index";
import { wovenLabelWorkOrders, brands, companies } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";
import type { WorkOrder } from "@db/schema";

/**
 * Woven work-order repository.
 *
 * Queries select from `woven_label_work_orders` directly — which absorbs the loom
 * specification (the former `woven_work_order_details` columns). No join to a
 * separate detail table is needed, and no `productType` filter is required: the
 * table itself is the type scope.
 */

export interface WorkOrderRow extends WorkOrder {
  brandName?: string | null;
  companyId?: number | null;
  companyName?: string | null;
  designCode?: string | null;
  pick?: number | null;
  repeat?: string | null;
  density?: number | null;
  speed?: string | null;
  extra?: string | null;
  estimatedWeavingHours?: string | null;
  sizeLabels?: any[] | null;
}

/**
 * The full woven work-order row: canonical columns + brand/company names +
 * the absorbed loom specification from `woven_label_work_orders`.
 */
const wovenWorkOrderSelect = {
  id: wovenLabelWorkOrders.id,
  soNumber: wovenLabelWorkOrders.soNumber,
  poNumber: wovenLabelWorkOrders.poNumber,
  orderDate: wovenLabelWorkOrders.orderDate,
  dueDate: wovenLabelWorkOrders.dueDate,
  totalQty: wovenLabelWorkOrders.totalQty,
  brandId: wovenLabelWorkOrders.brandId,
  comment: wovenLabelWorkOrders.comment,
  imageUrl: wovenLabelWorkOrders.imageUrl,
  dcImageUrl: wovenLabelWorkOrders.dcImageUrl,
  status: wovenLabelWorkOrders.status,
  priority: wovenLabelWorkOrders.priority,
  orderType: wovenLabelWorkOrders.orderType,
  productType: sql<"woven">`'woven'::text`,
  dcNumber: wovenLabelWorkOrders.dcNumber,
  lcNumber: wovenLabelWorkOrders.lcNumber,
  fbrInvoiceNumber: wovenLabelWorkOrders.fbrInvoiceNumber,
  dispatchedDate: wovenLabelWorkOrders.dispatchedDate,
  dispatchedQty: wovenLabelWorkOrders.dispatchedQty,
  createdAt: wovenLabelWorkOrders.createdAt,
  updatedAt: wovenLabelWorkOrders.updatedAt,
  brandName: brands.name,
  companyId: companies.id,
  companyName: companies.name,
  designCode: wovenLabelWorkOrders.designCode,
  pick: wovenLabelWorkOrders.pick,
  repeat: sql<string | null>`${wovenLabelWorkOrders.repeat}`,
  density: sql<number | null>`${wovenLabelWorkOrders.density}`,
  speed: sql<string | null>`${wovenLabelWorkOrders.speed}`,
  extra: sql<string | null>`${wovenLabelWorkOrders.extra}`,
  estimatedWeavingHours: sql<string | null>`${wovenLabelWorkOrders.estimatedWeavingHours}`,
  sizeLabels: sql<any[] | null>`${wovenLabelWorkOrders.sizeLabels}`,
};

export class WovenWorkOrderRepository {
  async findAll(filters?: {
    soNumber?: string;
    poNumber?: string;
    status?: WorkOrder["status"];
    designCode?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<WorkOrderRow[]> {
    const conditions = [];

    if (filters?.soNumber) conditions.push(sql`"so_number" ILIKE ${"%" + filters.soNumber + "%"}`);
    if (filters?.poNumber) conditions.push(sql`"po_number" ILIKE ${"%" + filters.poNumber + "%"}`);
    if (filters?.designCode) conditions.push(sql`"design_code" ILIKE ${"%" + filters.designCode + "%"}`);
    if (filters?.status) conditions.push(eq(wovenLabelWorkOrders.status, filters.status));
    if (filters?.startDate && filters?.endDate) {
      conditions.push(sql`"order_date" BETWEEN ${filters.startDate} AND ${filters.endDate}`);
    }

    return db
      .select(wovenWorkOrderSelect)
      .from(wovenLabelWorkOrders)
      .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(conditions.length > 0 ? conditions.reduce((a, b) => sql`${a} AND ${b}`) : undefined)
      .orderBy(desc(wovenLabelWorkOrders.createdAt));
  }

  async findById(id: number | string): Promise<WorkOrderRow | undefined> {
    const [row] = await db
      .select(wovenWorkOrderSelect)
      .from(wovenLabelWorkOrders)
      .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(wovenLabelWorkOrders.id, Number(id)));
    return row;
  }

  async findByDesignCode(designCode: string): Promise<WorkOrderRow | undefined> {
    const [row] = await db
      .select(wovenWorkOrderSelect)
      .from(wovenLabelWorkOrders)
      .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(wovenLabelWorkOrders.designCode, designCode));
    return row;
  }

  async findRawById(id: number | string) {
    const [row] = await db
      .select()
      .from(wovenLabelWorkOrders)
      .where(eq(wovenLabelWorkOrders.id, Number(id)));
    return row;
  }

  /** Creates a woven sales order with its loom specification. */
  async createWithWovenDetail(
    data: {
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
    },
    detail: {
      designCode: string;
      pick: number;
      repeat: number;
      density: number;
      speed?: number;
      extra?: number;
      sizeLabels?: string[];
      estimatedWeavingHours: number;
    }
  ) {
    const [row] = await db
      .insert(wovenLabelWorkOrders)
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
        designCode: detail.designCode,
        pick: detail.pick,
        repeat: String(detail.repeat),
        density: detail.density,
        speed: String(detail.speed ?? 0),
        extra: String(detail.extra ?? 0),
        estimatedWeavingHours: String(detail.estimatedWeavingHours),
        sizeLabels: detail.sizeLabels ?? [],
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
      .update(wovenLabelWorkOrders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(wovenLabelWorkOrders.id, Number(id)))
      .returning();
    return row;
  }

  /** Updates the woven loom specification for an existing woven work-order. */
  async updateWovenSpec(
    id: number,
    detail: Partial<{
      designCode: string;
      pick: number;
      repeat: number;
      density: number;
      speed: number;
      extra: number;
      estimatedWeavingHours: number;
      sizeLabels: string[];
    }>
  ) {
    const [row] = await db
      .update(wovenLabelWorkOrders)
      .set({
        ...(detail.designCode !== undefined ? { designCode: detail.designCode } : {}),
        ...(detail.pick !== undefined ? { pick: detail.pick } : {}),
        ...(detail.repeat !== undefined ? { repeat: String(detail.repeat) } : {}),
        ...(detail.density !== undefined ? { density: detail.density } : {}),
        ...(detail.speed !== undefined ? { speed: String(detail.speed) } : {}),
        ...(detail.extra !== undefined ? { extra: String(detail.extra) } : {}),
        ...(detail.estimatedWeavingHours !== undefined
          ? { estimatedWeavingHours: String(detail.estimatedWeavingHours) }
          : {}),
        ...(detail.sizeLabels !== undefined ? { sizeLabels: detail.sizeLabels } : {}),
        updatedAt: new Date(),
      })
      .where(eq(wovenLabelWorkOrders.id, id))
      .returning();
    return row;
  }

  async delete(id: number | string) {
    await db
      .delete(wovenLabelWorkOrders)
      .where(eq(wovenLabelWorkOrders.id, Number(id)));
  }
}

export const wovenWorkOrderRepository = new WovenWorkOrderRepository();