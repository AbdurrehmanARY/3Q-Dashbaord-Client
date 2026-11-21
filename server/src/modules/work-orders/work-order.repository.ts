import { db } from "@db/index";
import {
  printedLabelWorkOrders,
  wovenLabelWorkOrders,
  brands,
  companies,
} from "@db/schema";
import { eq, desc, sql, SQL } from "drizzle-orm";
import type { WorkOrder } from "@db/schema";

/** A work-order row enriched with brand/company names. */
export interface WorkOrderRow extends WorkOrder {
  brandName?: string | null;
  companyId?: number | null;
  companyName?: string | null;
}

/**
 * Printed work-order select: canonical columns + brand/company names, woven spec NULL.
 */
const printedSelect = {
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
  dcNumber: printedLabelWorkOrders.dcNumber,
  lcNumber: printedLabelWorkOrders.lcNumber,
  fbrInvoiceNumber: printedLabelWorkOrders.fbrInvoiceNumber,
  dispatchedDate: printedLabelWorkOrders.dispatchedDate,
  dispatchedQty: printedLabelWorkOrders.dispatchedQty,
  createdAt: printedLabelWorkOrders.createdAt,
  updatedAt: printedLabelWorkOrders.updatedAt,
  productType: sql<"printed">`'printed'::text`,
  brandName: brands.name,
  companyId: companies.id,
  companyName: companies.name,
  designCode: sql<string | null>`NULL`,
  pick: sql<number | null>`NULL`,
  repeat: sql<string | null>`NULL`,
  density: sql<number | null>`NULL`,
  speed: sql<string | null>`NULL`,
  extra: sql<string | null>`NULL`,
  estimatedWeavingHours: sql<string | null>`NULL`,
  sizeLabels: sql<any[] | null>`NULL`,
};

/**
 * Woven work-order select: identical shape to printed, but with loom spec from
 * the absorbed fields on `woven_label_work_orders`.
 */
const wovenSelect = {
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
  dcNumber: wovenLabelWorkOrders.dcNumber,
  lcNumber: wovenLabelWorkOrders.lcNumber,
  fbrInvoiceNumber: wovenLabelWorkOrders.fbrInvoiceNumber,
  dispatchedDate: wovenLabelWorkOrders.dispatchedDate,
  dispatchedQty: wovenLabelWorkOrders.dispatchedQty,
  createdAt: wovenLabelWorkOrders.createdAt,
  updatedAt: wovenLabelWorkOrders.updatedAt,
  productType: sql<"woven">`'woven'::text`,
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

/**
 * Builds a WHERE-condition list shared by both printed and woven queries.
 * Column names are the same on both tables, so the same SQL fragments apply.
 */
function buildConditions(filters?: {
  soNumber?: string;
  poNumber?: string;
  status?: WorkOrder["status"];
  productType?: WorkOrder["productType"];
  dcNumber?: string;
  lcNumber?: string;
  designCode?: string;
  startDate?: string;
  endDate?: string;
}): SQL[] {
  const conditions: SQL[] = [];
  if (filters?.soNumber) conditions.push(sql`"so_number" ILIKE ${"%" + filters.soNumber + "%"}`);
  if (filters?.poNumber) conditions.push(sql`"po_number" ILIKE ${"%" + filters.poNumber + "%"}`);
  if (filters?.dcNumber) conditions.push(sql`"dc_number" ILIKE ${"%" + filters.dcNumber + "%"}`);
  if (filters?.lcNumber) conditions.push(sql`"lc_number" ILIKE ${"%" + filters.lcNumber + "%"}`);
  if (filters?.status) conditions.push(sql`"status" = ${filters.status}`);
  if (filters?.designCode) conditions.push(sql`"design_code" ILIKE ${"%" + filters.designCode + "%"}`);
  if (filters?.startDate && filters?.endDate) {
    conditions.push(sql`"order_date" BETWEEN ${filters.startDate} AND ${filters.endDate}`);
  }
  return conditions;
}

export class WorkOrderRepository {
  /**
   * Returns ALL sales orders (both printed and woven). The `productType` filter
   * narrows to one table; without it, both tables are queried and results merged.
   */
  async findAll(filters?: {
    soNumber?: string;
    poNumber?: string;
    status?: WorkOrder["status"];
    productType?: WorkOrder["productType"];
    dcNumber?: string;
    lcNumber?: string;
    designCode?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<WorkOrderRow[]> {
    const printedConditions = buildConditions({ ...filters, designCode: undefined });
    const wovenConditions = buildConditions(filters);

    const queryBoth = !filters?.productType;
    const queryPrinted = queryBoth || filters?.productType === "printed";
    const queryWoven = queryBoth || filters?.productType === "woven";

    const printedWhere = printedConditions.length > 0
      ? printedConditions.reduce((a, b) => sql`${a} AND ${b}`)
      : undefined;
    const wovenWhere = wovenConditions.length > 0
      ? wovenConditions.reduce((a, b) => sql`${a} AND ${b}`)
      : undefined;

    const [printed, woven] = await Promise.all([
      queryPrinted
        ? db
            .select(printedSelect)
            .from(printedLabelWorkOrders)
            .leftJoin(brands, eq(printedLabelWorkOrders.brandId, brands.id))
            .leftJoin(companies, eq(brands.companyId, companies.id))
            .where(printedWhere as any)
            .orderBy(desc(printedLabelWorkOrders.createdAt))
        : Promise.resolve([] as WorkOrderRow[]),

      queryWoven
        ? db
            .select(wovenSelect)
            .from(wovenLabelWorkOrders)
            .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
            .leftJoin(companies, eq(brands.companyId, companies.id))
            .where(wovenWhere as any)
            .orderBy(desc(wovenLabelWorkOrders.createdAt))
        : Promise.resolve([] as WorkOrderRow[]),
    ]);

    const merged = [...(printed as any[]), ...(woven as any[])].sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return tb - ta;
    });

    return merged as WorkOrderRow[];
  }

  /**
   * Returns a single sales order by ID, from whichever table holds it.
   * Tries printed first, then woven — exactly one will return a row.
   */
  async findById(id: number | string): Promise<WorkOrderRow | undefined> {
    const numId = Number(id);

    const [printed] = await db
      .select(printedSelect)
      .from(printedLabelWorkOrders)
      .leftJoin(brands, eq(printedLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(printedLabelWorkOrders.id, numId));

    if (printed) return printed as WorkOrderRow;

    const [woven] = await db
      .select(wovenSelect)
      .from(wovenLabelWorkOrders)
      .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(wovenLabelWorkOrders.id, numId));

    return woven as WorkOrderRow | undefined;
  }

  /** Finds a work-order row by its SO number, from whichever table holds it. */
  async findBySoNumber(soNumber: string): Promise<WorkOrderRow | undefined> {
    const [printed] = await db
      .select(printedSelect)
      .from(printedLabelWorkOrders)
      .leftJoin(brands, eq(printedLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(printedLabelWorkOrders.soNumber, soNumber));

    if (printed) return printed as WorkOrderRow;

    const [woven] = await db
      .select(wovenSelect)
      .from(wovenLabelWorkOrders)
      .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(wovenLabelWorkOrders.soNumber, soNumber));

    return woven as WorkOrderRow | undefined;
  }

  /** Looks up a woven work-order by design code (unique facility-wide). */
  async findByDesignCode(designCode: string): Promise<WorkOrderRow | undefined> {
    const [woven] = await db
      .select(wovenSelect)
      .from(wovenLabelWorkOrders)
      .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .where(eq(wovenLabelWorkOrders.designCode, designCode));

    return woven as WorkOrderRow | undefined;
  }

  async findRawById(id: number | string): Promise<WorkOrderRow | undefined> {
    return this.findById(id);
  }

  /** Returns the raw woven loom spec for this order (undefined if not woven). */
  async findWovenSpec(id: number | string) {
    const [row] = await db
      .select({
        id: wovenLabelWorkOrders.id,
        designCode: wovenLabelWorkOrders.designCode,
        pick: wovenLabelWorkOrders.pick,
        repeat: sql<string | null>`${wovenLabelWorkOrders.repeat}`,
        density: sql<number | null>`${wovenLabelWorkOrders.density}`,
        speed: sql<string | null>`${wovenLabelWorkOrders.speed}`,
        extra: sql<string | null>`${wovenLabelWorkOrders.extra}`,
        estimatedWeavingHours: sql<string | null>`${wovenLabelWorkOrders.estimatedWeavingHours}`,
        sizeLabels: sql<any[] | null>`${wovenLabelWorkOrders.sizeLabels}`,
      })
      .from(wovenLabelWorkOrders)
      .where(eq(wovenLabelWorkOrders.id, Number(id)));
    return row;
  }

  /** Creates a printed sales order. */
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

  /** Upserts the woven loom specification for an existing woven work-order. */
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

  /** Updates a work-order by ID. Tries woven first, then printed. */
  async update(id: number | string, data: {
    poNumber?: string | null;
    dueDate?: string | null;
    totalQty?: number;
    brandId?: number | null;
    comment?: string | null;
    imageUrl?: string | null;
    dcImageUrl?: string | null;
    status?: WorkOrder["status"];
    priority?: string;
    orderType?: string;
    dcNumber?: string | null;
    lcNumber?: string | null;
    fbrInvoiceNumber?: string | null;
    dispatchedDate?: string | null;
    dispatchedQty?: number | null;
  }) {
    const [woven] = await db
      .update(wovenLabelWorkOrders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(wovenLabelWorkOrders.id, Number(id)))
      .returning();

    if (woven) return woven;

    const [printed] = await db
      .update(printedLabelWorkOrders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(printedLabelWorkOrders.id, Number(id)))
      .returning();

    return printed;
  }

  /** Deletes a work-order from whichever table holds it. */
  async delete(id: number | string) {
    const [woven] = await db
      .delete(wovenLabelWorkOrders)
      .where(eq(wovenLabelWorkOrders.id, Number(id)))
      .returning();

    if (woven) return;

    await db
      .delete(printedLabelWorkOrders)
      .where(eq(printedLabelWorkOrders.id, Number(id)));
  }
}

export const workOrderRepository = new WorkOrderRepository();