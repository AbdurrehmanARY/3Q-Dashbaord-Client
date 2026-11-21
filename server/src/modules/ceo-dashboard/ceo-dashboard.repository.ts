import { db } from "@db/index";
import {
  inventoryRolls,
  materials,
  threadStocks,
  printedLabelWorkOrders,
  wovenLabelWorkOrders,
  productionOrders,
  productionBatches,
  operators,
  machines,
  brands,
  companies,
} from "@db/schema";
import { sql, eq, desc, and } from "drizzle-orm";

/**
 * CEO dashboard — read-only monitoring repository.
 *
 * Every method returns aggregated data for one of the six dashboard pages.
 * No write methods exist here; the router only registers GET handlers.
 */
export class CeoDashboardRepository {
  /* --- 1. Roll stock --- */

  /** Roll inventory by material, with low-stock flag. */
  async getRollStock() {
    const rows = await db
      .select({
        materialCode: materials.code,
        materialType: materials.type,
        description: materials.description,
        weightPerRoll: materials.weightPerRoll,
        minStockLevel: materials.minStockLevel,
        openingStock: inventoryRolls.openingStock,
        receivedRolls: inventoryRolls.receivedRolls,
        issuedRolls: inventoryRolls.issuedRolls,
        balanceRolls: inventoryRolls.balanceRolls,
        rollPerKg: inventoryRolls.rollPerKg,
      })
      .from(inventoryRolls)
      .innerJoin(materials, eq(inventoryRolls.materialCode, materials.code));

    return rows.map((r) => ({
      materialCode: r.materialCode,
      materialType: r.materialType,
      description: r.description,
      weightPerRoll: Number(r.weightPerRoll),
      minStockLevel: Number(r.minStockLevel),
      openingStock: Number(r.openingStock),
      receivedRolls: Number(r.receivedRolls),
      issuedRolls: Number(r.issuedRolls),
      balanceRolls: Number(r.balanceRolls),
      rollPerKg: Number(r.rollPerKg),
      isLowStock: Number(r.balanceRolls) < Number(r.minStockLevel),
    }));
  }

  /** Roll stock summary figures. */
  async getRollStockSummary() {
    const [row] = await db
      .select({
        totalMaterials: sql<number>`count(*)`,
        totalBalanceRolls: sql<number>`coalesce(sum(cast(${inventoryRolls.balanceRolls} as numeric)), 0)`,
        totalIssuedRolls: sql<number>`coalesce(sum(cast(${inventoryRolls.issuedRolls} as numeric)), 0)`,
        lowStockCount: sql<number>`count(*) filter (where cast(${inventoryRolls.balanceRolls} as numeric) < cast(${materials.minStockLevel} as numeric))`,
      })
      .from(inventoryRolls)
      .innerJoin(materials, eq(inventoryRolls.materialCode, materials.code));

    return {
      totalMaterials: Number(row?.totalMaterials ?? 0),
      totalBalanceRolls: Number(row?.totalBalanceRolls ?? 0),
      totalIssuedRolls: Number(row?.totalIssuedRolls ?? 0),
      lowStockCount: Number(row?.lowStockCount ?? 0),
    };
  }

  /* --- 2. Thread stock --- */

  /** Thread stock by type/colour/denier with balance weight. */
  async getThreadStock() {
    const rows = await db.select({
      stockType: threadStocks.stockType,
      denier: threadStocks.denier,
      colorName: threadStocks.colorName,
      colorCode: threadStocks.colorCode,
      balanceKg: threadStocks.balanceKg,
      receivedKg: threadStocks.receivedKg,
      consumedKg: threadStocks.consumedKg,
    }).from(threadStocks);

    return rows.map((r) => ({
      stockType: r.stockType,
      denier: r.denier,
      colorName: r.colorName,
      colorCode: r.colorCode,
      balanceKg: Number(r.balanceKg),
      receivedKg: Number(r.receivedKg),
      consumedKg: Number(r.consumedKg),
    }));
  }

  async getThreadStockSummary() {
    const [primary, secondary] = await Promise.all([
      db
        .select({
          totalKg: sql<number>`coalesce(sum(cast(${threadStocks.balanceKg} as numeric)), 0)`,
        })
        .from(threadStocks)
        .where(eq(threadStocks.stockType, "primary")),
      db
        .select({
          totalKg: sql<number>`coalesce(sum(cast(${threadStocks.balanceKg} as numeric)), 0)`,
        })
        .from(threadStocks)
        .where(eq(threadStocks.stockType, "secondary")),
    ]);

    return {
      undyedKg: Number(primary[0]?.totalKg ?? 0),
      dyedKg: Number(secondary[0]?.totalKg ?? 0),
      totalKg: Number(primary[0]?.totalKg ?? 0) + Number(secondary[0]?.totalKg ?? 0),
    };
  }

  /* --- 3. Work orders --- */

  async getWorkOrders() {
    const [printed, woven] = await Promise.all([
      db
        .select({
          id: printedLabelWorkOrders.id,
          soNumber: printedLabelWorkOrders.soNumber,
          poNumber: printedLabelWorkOrders.poNumber,
          orderDate: printedLabelWorkOrders.orderDate,
          dueDate: printedLabelWorkOrders.dueDate,
          totalQty: printedLabelWorkOrders.totalQty,
          priority: printedLabelWorkOrders.priority,
          orderType: printedLabelWorkOrders.orderType,
          status: printedLabelWorkOrders.status,
          productType: sql<"printed">`'printed'::text`,
          brandName: brands.name,
          companyName: companies.name,
          createdAt: printedLabelWorkOrders.createdAt,
        })
        .from(printedLabelWorkOrders)
        .leftJoin(brands, eq(printedLabelWorkOrders.brandId, brands.id))
        .leftJoin(companies, eq(brands.companyId, companies.id)),
      db
        .select({
          id: wovenLabelWorkOrders.id,
          soNumber: wovenLabelWorkOrders.soNumber,
          poNumber: wovenLabelWorkOrders.poNumber,
          orderDate: wovenLabelWorkOrders.orderDate,
          dueDate: wovenLabelWorkOrders.dueDate,
          totalQty: wovenLabelWorkOrders.totalQty,
          priority: wovenLabelWorkOrders.priority,
          orderType: wovenLabelWorkOrders.orderType,
          status: wovenLabelWorkOrders.status,
          productType: sql<"woven">`'woven'::text`,
          brandName: brands.name,
          companyName: companies.name,
          createdAt: wovenLabelWorkOrders.createdAt,
        })
        .from(wovenLabelWorkOrders)
        .leftJoin(brands, eq(wovenLabelWorkOrders.brandId, brands.id))
        .leftJoin(companies, eq(brands.companyId, companies.id)),
    ]);

    return [...printed, ...woven].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getWorkOrdersSummary() {
    const [
      printedTotal, wovenTotal,
      printedByStatus, wovenByStatus,
    ] = await Promise.all([
      db.select({ value: sql<number>`count(*)` }).from(printedLabelWorkOrders),
      db.select({ value: sql<number>`count(*)` }).from(wovenLabelWorkOrders),
      db
        .select({ status: printedLabelWorkOrders.status, count: sql<number>`count(*)` })
        .from(printedLabelWorkOrders)
        .groupBy(printedLabelWorkOrders.status),
      db
        .select({ status: wovenLabelWorkOrders.status, count: sql<number>`count(*)` })
        .from(wovenLabelWorkOrders)
        .groupBy(wovenLabelWorkOrders.status),
    ]);

    const statusMap = new Map<string, number>();
    for (const r of [...printedByStatus, ...wovenByStatus]) {
      statusMap.set(r.status, (statusMap.get(r.status) ?? 0) + Number(r.count));
    }

    const printedCount = Number(printedTotal[0]?.value ?? 0);
    const wovenCount = Number(wovenTotal[0]?.value ?? 0);

    return {
      total: printedCount + wovenCount,
      byStatus: Array.from(statusMap.entries()).map(([status, count]) => ({ status, count })),
      byProductType: [
        { productType: "printed", count: printedCount },
        { productType: "woven", count: wovenCount },
      ],
    };
  }

  /* --- 4. Production --- */

  async getProductionOrders() {
    const rows = await db
      .select({
        id: productionOrders.id,
        productionNumber: productionOrders.productionNumber,
        soNumber: sql<string | null>`COALESCE(${printedLabelWorkOrders.soNumber}, ${wovenLabelWorkOrders.soNumber})`,
        poNumber: sql<string | null>`COALESCE(${printedLabelWorkOrders.poNumber}, ${wovenLabelWorkOrders.poNumber})`,
        totalQty: productionOrders.totalQty,
        status: productionOrders.status,
        productType: sql<"printed" | "woven">`CASE WHEN ${productionOrders.printedWorkOrderId} IS NOT NULL THEN 'printed' ELSE 'woven' END`,
        plannedAt: productionOrders.plannedAt,
        completedAt: productionOrders.completedAt,
        brandName: brands.name,
        companyName: companies.name,
        createdAt: productionOrders.createdAt,
      })
      .from(productionOrders)
      .leftJoin(printedLabelWorkOrders, eq(printedLabelWorkOrders.id, productionOrders.printedWorkOrderId))
      .leftJoin(wovenLabelWorkOrders, eq(wovenLabelWorkOrders.id, productionOrders.wovenWorkOrderId))
      .leftJoin(brands, eq(brands.id, sql`COALESCE(${printedLabelWorkOrders.brandId}, ${wovenLabelWorkOrders.brandId})`))
      .leftJoin(companies, eq(brands.companyId, companies.id))
      .orderBy(desc(productionOrders.createdAt));

    return rows;
  }

  async getProductionSummary() {
    const total = await db.select({ value: sql<number>`count(*)` }).from(productionOrders);
    const byStatus = await db
      .select({ status: productionOrders.status, count: sql<number>`count(*)` })
      .from(productionOrders)
      .groupBy(productionOrders.status);
    const byProductType = await db
      .select({
        productType: sql<"printed" | "woven">`CASE WHEN ${productionOrders.printedWorkOrderId} IS NOT NULL THEN 'printed' ELSE 'woven' END`,
        count: sql<number>`count(*)`,
      })
      .from(productionOrders)
      .groupBy(sql`CASE WHEN ${productionOrders.printedWorkOrderId} IS NOT NULL THEN 'printed' ELSE 'woven' END`);

    return {
      total: Number(total[0]?.value ?? 0),
      byStatus: byStatus.map((r) => ({ status: r.status, count: Number(r.count) })),
      byProductType: byProductType.map((r) => ({ productType: r.productType, count: Number(r.count) })),
    };
  }

  /* --- 5. Operators --- */

  async getOperators() {
    return db
      .select({
        id: operators.id,
        name: operators.name,
        employeeCode: operators.employeeCode,
        designation: operators.designation,
        operatorType: operators.operatorType,
        shift: operators.shift,
        status: operators.status,
        isActive: operators.isActive,
        avatarUrl: operators.avatarUrl,
        createdAt: operators.createdAt,
      })
      .from(operators)
      .orderBy(operators.name);
  }

  /** Active production batches with assigned operator. */
  async getOperatorUtilization() {
    return db
      .select({
        operatorId: productionBatches.operatorId,
        operatorName: operators.name,
        operatorDesignation: operators.designation,
        stage: productionBatches.stage,
        batchCode: productionBatches.batchCode,
        productionNumber: productionOrders.productionNumber,
        batchStatus: productionBatches.status,
        batchStartedAt: productionBatches.startedAt,
        machineName: machines.name,
      })
      .from(productionBatches)
      .innerJoin(operators, eq(operators.id, productionBatches.operatorId!))
      .leftJoin(machines, eq(machines.id, productionBatches.machineId!))
      .innerJoin(productionOrders, eq(productionOrders.id, productionBatches.productionOrderId))
      .where(
        and(
          eq(productionBatches.status, "IN_PROGRESS"),
          sql`${productionBatches.operatorId} IS NOT NULL`
        )
      );
  }

  /* --- 6. Machines --- */

  async getMachines() {
    return db
      .select({
        id: machines.id,
        name: machines.name,
        machineCode: machines.machineCode,
        machineName: machines.machineName,
        machineType: machines.machineType,
        productType: machines.productType,
        capacityPerHour: machines.capacityPerHour,
        status: machines.status,
        isActive: machines.isActive,
        operatorName: operators.name,
        createdAt: machines.createdAt,
      })
      .from(machines)
      .leftJoin(operators, eq(operators.id, machines.machineOperatorId!))
      .orderBy(machines.name);
  }

  /** Active production batches per machine. */
  async getMachineUtilization() {
    return db
      .select({
        machineId: productionBatches.machineId,
        machineName: machines.name,
        machineType: machines.machineType,
        stage: productionBatches.stage,
        batchCode: productionBatches.batchCode,
        productionNumber: productionOrders.productionNumber,
        batchStatus: productionBatches.status,
        batchStartedAt: productionBatches.startedAt,
        assignedRolls: productionBatches.assignedRolls,
        producedRolls: productionBatches.producedRolls,
        operatorName: operators.name,
      })
      .from(productionBatches)
      .innerJoin(machines, eq(machines.id, productionBatches.machineId!))
      .leftJoin(operators, eq(operators.id, productionBatches.operatorId!))
      .innerJoin(productionOrders, eq(productionOrders.id, productionBatches.productionOrderId))
      .where(
        and(
          eq(productionBatches.status, "IN_PROGRESS"),
          sql`${productionBatches.machineId} IS NOT NULL`
        )
      );
  }
}

export const ceoDashboardRepository = new CeoDashboardRepository();
