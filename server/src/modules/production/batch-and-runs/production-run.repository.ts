import { db } from "@db/index";
import { productionRuns, machines, operators, users, printedLabelWorkOrders, wovenLabelWorkOrders } from "@db/schema";
import { and, desc, eq, gte, isNull, or, sql } from "drizzle-orm";
import type { NewProductionRun } from "@db/schema";

export class ProductionRunRepository {
  /** Append-only: only ever inserts, never updates a prior run. */
  async create(data: NewProductionRun) {
    const [run] = await db.insert(productionRuns).values(data).returning();
    return run;
  }

  /** Full history for a sale order, newest first, with machine/operator/user names joined. */
  async findBySaleOrderId(saleOrderId: number) {
    return db
      .select({
        id: productionRuns.id,
        saleOrderId: sql<number | null>`COALESCE(${productionRuns.printedSaleOrderId}, ${productionRuns.wovenSaleOrderId})`,
        productId: productionRuns.productId,
        machineId: productionRuns.machineId,
        machineName: machines.machineName,
        operatorId: productionRuns.operatorId,
        operatorName: operators.name,
        quantityProduced: productionRuns.quantityProduced,
        runReason: productionRuns.runReason,
        notes: productionRuns.notes,
        producedAt: productionRuns.producedAt,
        createdBy: productionRuns.createdBy,
        createdByName: users.name,
        createdAt: productionRuns.createdAt,
      })
      .from(productionRuns)
      .leftJoin(machines, eq(productionRuns.machineId, machines.id))
      .leftJoin(operators, eq(productionRuns.operatorId, operators.id))
      .leftJoin(users, eq(productionRuns.createdBy, users.id))
      .where(
        or(
          eq(productionRuns.printedSaleOrderId, saleOrderId),
          eq(productionRuns.wovenSaleOrderId, saleOrderId)
        )
      )
      .orderBy(desc(productionRuns.producedAt));
  }

  /** Derived Total Produced = SUM(quantity_produced) across every run. */
  async getTotalProduced(saleOrderId: number): Promise<number> {
    const [row] = await db
      .select({ total: sql<string>`coalesce(sum(${productionRuns.quantityProduced}), 0)` })
      .from(productionRuns)
      .where(
        or(
          eq(productionRuns.printedSaleOrderId, saleOrderId),
          eq(productionRuns.wovenSaleOrderId, saleOrderId)
        )
      );
    return Number(row?.total ?? 0);
  }

  async getMachineBreakdown(saleOrderId: number) {
    return db
      .select({
        machineId: productionRuns.machineId,
        machineName: machines.machineName,
        totalQuantity: sql<string>`coalesce(sum(${productionRuns.quantityProduced}), 0)`,
        runCount: sql<number>`cast(count(*) as int)`,
      })
      .from(productionRuns)
      .leftJoin(machines, eq(productionRuns.machineId, machines.id))
      .where(
        or(
          eq(productionRuns.printedSaleOrderId, saleOrderId),
          eq(productionRuns.wovenSaleOrderId, saleOrderId)
        )
      )
      .groupBy(productionRuns.machineId, machines.machineName);
  }

  async getOperatorBreakdown(saleOrderId: number) {
    return db
      .select({
        operatorId: productionRuns.operatorId,
        operatorName: operators.name,
        totalQuantity: sql<string>`coalesce(sum(${productionRuns.quantityProduced}), 0)`,
        runCount: sql<number>`cast(count(*) as int)`,
      })
      .from(productionRuns)
      .leftJoin(operators, eq(productionRuns.operatorId, operators.id))
      .where(
        or(
          eq(productionRuns.printedSaleOrderId, saleOrderId),
          eq(productionRuns.wovenSaleOrderId, saleOrderId)
        )
      )
      .groupBy(productionRuns.operatorId, operators.name);
  }

  async findByIdempotencyKey(key: string) {
    const [run] = await db
      .select()
      .from(productionRuns)
      .where(eq(productionRuns.idempotencyKey, key))
      .limit(1);
    return run;
  }

  /**
   * A run with the same sale order / machine / operator / quantity created in the last
   * `windowMs` — the fingerprint of an accidental double-submit.
   */
  async findRecentDuplicate(params: {
    saleOrderId: number;
    machineId?: number | null;
    operatorId?: number | null;
    quantityProduced: string;
    windowMs?: number;
  }) {
    const since = new Date(Date.now() - (params.windowMs ?? 5000));
    const [run] = await db
      .select()
      .from(productionRuns)
      .where(
        and(
          eq(
            sql`COALESCE(${productionRuns.printedSaleOrderId}, ${productionRuns.wovenSaleOrderId})`,
            params.saleOrderId
          ),
          params.machineId == null
            ? isNull(productionRuns.machineId)
            : eq(productionRuns.machineId, params.machineId),
          params.operatorId == null
            ? isNull(productionRuns.operatorId)
            : eq(productionRuns.operatorId, params.operatorId),
          eq(productionRuns.quantityProduced, params.quantityProduced),
          gte(productionRuns.createdAt, since)
        )
      )
      .limit(1);
    return run;
  }

  /** Ordered quantity comes from the sale order (work_orders). */
  async getWorkOrder(saleOrderId: number) {
    const [printed] = await db
      .select()
      .from(printedLabelWorkOrders)
      .where(eq(printedLabelWorkOrders.id, saleOrderId))
      .limit(1);
    if (printed) return { ...printed, productType: "printed" as const };

    const [woven] = await db
      .select()
      .from(wovenLabelWorkOrders)
      .where(eq(wovenLabelWorkOrders.id, saleOrderId))
      .limit(1);
    if (woven) return { ...woven, productType: "woven" as const };

    return undefined;
  }
}

export const productionRunRepository = new ProductionRunRepository();
