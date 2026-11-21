import { db } from "@db/index";
import { printedLabelWorkOrders, wovenLabelWorkOrders, productionOrderLines, materials, inventoryRolls, purchaseRecords } from "@db/schema";
import { desc, asc, and, eq, sql } from "drizzle-orm";
import type { ProductionOrderLine, Material, InventoryRoll, PurchaseRecord } from "@db/schema";

export class AnalyticsRepository {
  async countWorkOrders() {
    const [printedRow] = await db.select({ value: sql<number>`count(*)` }).from(printedLabelWorkOrders);
    const [wovenRow] = await db.select({ value: sql<number>`count(*)` }).from(wovenLabelWorkOrders);
    return Number(printedRow?.value ?? 0) + Number(wovenRow?.value ?? 0);
  }

  /** Work orders still in production (not yet completed/dispatched). */
  async countSubmittedWorkOrders() {
    const [printedRow] = await db
      .select({ value: sql<number>`count(*)` })
      .from(printedLabelWorkOrders)
      .where(eq(printedLabelWorkOrders.status, "initiate_production"));
    const [wovenRow] = await db
      .select({ value: sql<number>`count(*)` })
      .from(wovenLabelWorkOrders)
      .where(eq(wovenLabelWorkOrders.status, "initiate_production"));
    return Number(printedRow?.value ?? 0) + Number(wovenRow?.value ?? 0);
  }

  /* Production counts are per label-type line on a production order. A line is complete
     when every planned roll has been packaged. */
  async countProductionProgress() {
    const [row] = await db.select({ value: sql<number>`count(*)` }).from(productionOrderLines);
    return Number(row?.value ?? 0);
  }

  async countActiveProductionProgress() {
    const [row] = await db
      .select({ value: sql<number>`count(*)` })
      .from(productionOrderLines)
      .where(sql`cast(${productionOrderLines.packagedRolls} as numeric) < cast(${productionOrderLines.totalRolls} as numeric)`);
    return Number(row?.value ?? 0);
  }

  async countCompletedProductionProgress() {
    const [row] = await db
      .select({ value: sql<number>`count(*)` })
      .from(productionOrderLines)
      .where(
        sql`cast(${productionOrderLines.packagedRolls} as numeric) >= cast(${productionOrderLines.totalRolls} as numeric) AND cast(${productionOrderLines.totalRolls} as numeric) > 0`
      );
    return Number(row?.value ?? 0);
  }

  async countMaterials() {
    const [row] = await db.select({ value: sql<number>`count(*)` }).from(materials);
    return Number(row?.value ?? 0);
  }

  async countLowStock() {
    const [row] = await db.select({ value: sql<number>`count(*)` }).from(inventoryRolls).where(sql`cast(${inventoryRolls.balanceRolls} as numeric) < 5`);
    return Number(row?.value ?? 0);
  }

  async sumBalanceRolls() {
    const [row] = await db.select({ value: sql<number>`coalesce(sum(cast(${inventoryRolls.balanceRolls} as numeric)), 0)` }).from(inventoryRolls);
    return Number(row?.value ?? 0);
  }

  async sumIssuedRolls() {
    const [row] = await db.select({ value: sql<number>`coalesce(sum(cast(${inventoryRolls.issuedRolls} as numeric)), 0)` }).from(inventoryRolls);
    return Number(row?.value ?? 0);
  }

}

export const analyticsRepository = new AnalyticsRepository();
