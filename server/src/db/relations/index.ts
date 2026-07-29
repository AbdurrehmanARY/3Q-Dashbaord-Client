import { relations } from "drizzle-orm";
import { companies } from "../tables/companies.table";
import { brands } from "../tables/brands.table";
import { workOrders } from "../tables/work-orders.table";
import { materials } from "../tables/materials.table";
import { machines } from "../tables/machines.table";
import { operators } from "../tables/operators.table";
import { inventoryRolls } from "../tables/inventory-rolls.table";
import { purchaseRecords } from "../tables/purchase-record.table";
import { users } from "../tables/users.table";
import { productionOrders } from "../tables/production-orders.table";
import { productionOrderLines } from "../tables/production-order-lines.table";
import { productionStageEvents } from "../tables/production-stage-events.table";
import { productionRollIssuances } from "../tables/production-roll-issuances.table";

export const companiesRelations = relations(companies, ({ many }) => ({
  brands: many(brands),
}));

export const brandsRelations = relations(brands, ({ one, many }) => ({
  company: one(companies, {
    fields: [brands.companyId],
    references: [companies.id],
  }),
  workOrders: many(workOrders),
}));

export const workOrdersRelations = relations(workOrders, ({ one, many }) => ({
  brand: one(brands, {
    fields: [workOrders.brandId],
    references: [brands.id],
  }),
  productionOrders: many(productionOrders),
}));

export const usersRelations = relations(users, ({ many }) => ({
  operators: many(operators),
  createdProductionOrders: many(productionOrders),
  stageEvents: many(productionStageEvents),
  rollIssuances: many(productionRollIssuances),
}));

export const productionOrdersRelations = relations(productionOrders, ({ one, many }) => ({
  workOrder: one(workOrders, {
    fields: [productionOrders.workOrderId],
    references: [workOrders.id],
  }),
  createdBy: one(users, {
    fields: [productionOrders.createdByUserId],
    references: [users.id],
  }),
  lines: many(productionOrderLines),
}));

export const productionOrderLinesRelations = relations(productionOrderLines, ({ one, many }) => ({
  productionOrder: one(productionOrders, {
    fields: [productionOrderLines.productionOrderId],
    references: [productionOrders.id],
  }),
  material: one(materials, {
    fields: [productionOrderLines.materialCode],
    references: [materials.code],
  }),
  printingMachine: one(machines, {
    fields: [productionOrderLines.printingMachineId],
    references: [machines.id],
    relationName: "linePrintingMachine",
  }),
  printingOperator: one(operators, {
    fields: [productionOrderLines.printingOperatorId],
    references: [operators.id],
    relationName: "linePrintingOperator",
  }),
  cuttingMachine: one(machines, {
    fields: [productionOrderLines.cuttingMachineId],
    references: [machines.id],
    relationName: "lineCuttingMachine",
  }),
  cuttingOperator: one(operators, {
    fields: [productionOrderLines.cuttingOperatorId],
    references: [operators.id],
    relationName: "lineCuttingOperator",
  }),
  packagingOperator: one(operators, {
    fields: [productionOrderLines.packagingOperatorId],
    references: [operators.id],
    relationName: "linePackagingOperator",
  }),
  stageEvents: many(productionStageEvents),
  rollIssuances: many(productionRollIssuances),
}));

export const productionStageEventsRelations = relations(productionStageEvents, ({ one }) => ({
  line: one(productionOrderLines, {
    fields: [productionStageEvents.productionOrderLineId],
    references: [productionOrderLines.id],
  }),
  actor: one(users, {
    fields: [productionStageEvents.actorUserId],
    references: [users.id],
  }),
}));

export const productionRollIssuancesRelations = relations(productionRollIssuances, ({ one }) => ({
  line: one(productionOrderLines, {
    fields: [productionRollIssuances.productionOrderLineId],
    references: [productionOrderLines.id],
  }),
  material: one(materials, {
    fields: [productionRollIssuances.materialCode],
    references: [materials.code],
  }),
  actor: one(users, {
    fields: [productionRollIssuances.actorUserId],
    references: [users.id],
  }),
}));

export const materialsRelations = relations(materials, ({ many }) => ({
  purchaseRecords: many(purchaseRecords),
  inventoryRolls: many(inventoryRolls),
  productionOrderLines: many(productionOrderLines),
  rollIssuances: many(productionRollIssuances),
}));

export const purchaseRecordsRelations = relations(purchaseRecords, ({ one }) => ({
  material: one(materials, {
    fields: [purchaseRecords.materialCode],
    references: [materials.code],
  }),
}));

export const inventoryRollsRelations = relations(inventoryRolls, ({ one }) => ({
  material: one(materials, {
    fields: [inventoryRolls.materialCode],
    references: [materials.code],
  }),
}));

export const machinesRelations = relations(machines, ({ one, many }) => ({
  operator: one(operators, {
    fields: [machines.machineOperatorId],
    references: [operators.id],
  }),
  cuttingLines: many(productionOrderLines, {
    relationName: "lineCuttingMachine",
  }),
  printingLines: many(productionOrderLines, {
    relationName: "linePrintingMachine",
  }),
}));

export const operatorsRelations = relations(operators, ({ one, many }) => ({
  machines: many(machines),
  user: one(users, {
    fields: [operators.userId],
    references: [users.id],
  }),
  cuttingLines: many(productionOrderLines, {
    relationName: "lineCuttingOperator",
  }),
  printingLines: many(productionOrderLines, {
    relationName: "linePrintingOperator",
  }),
  packagingLines: many(productionOrderLines, {
    relationName: "linePackagingOperator",
  }),
}));
