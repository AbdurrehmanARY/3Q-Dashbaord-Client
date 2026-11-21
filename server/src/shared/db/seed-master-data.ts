/**
 * Master-data seed: ALL tables except work orders and production.
 *
 * Seeds: materials, operators, machines, users, companies, brands,
 * purchaseRecords, inventoryRolls, labelTypes, threadServiceProviders,
 * threadStocks, threadPurchases, threadDyeingSends, threadDyeingAllocations,
 * threadDyeingReceives, threadDyeBatches, stickerMaterials, localSheets,
 * labelSheets, inkPurchases, inkConsumptions.
 *
 * Idempotent and additive — upserts on natural key, never deletes.
 *
 *   npm run db:seed:master-data
 */
import { eq } from "drizzle-orm";
import { db } from "./index";
import {
  companies, brands, materials, machines, operators, users,
  purchaseRecords, inventoryRolls, labelTypes,
  threadServiceProviders, threadStocks, threadPurchases,
  threadDyeingSends, threadDyeingAllocations, threadDyeingReceives,
  threadDyeBatches, stickerMaterials, localSheets, labelSheets,
  inkPurchases, inkConsumptions,
} from "@db/schema";
import bcrypt from "bcryptjs";
import { MATERIALS, OPERATORS, MACHINES, COMPANIES, USERS, VENDORS, PURCHASE_SEEDS,
  LABEL_TYPES, THREAD_SERVICE_PROVIDERS, THREAD_STOCKS, THREAD_PURCHASES,
  THREAD_DYEING_SENDS, THREAD_DYEING_ALLOCATIONS, THREAD_DYEING_RECEIVES,
  THREAD_DYE_BATCHES, STICKER_MATERIALS, LOCAL_SHEETS, LABEL_SHEETS,
  INK_PURCHASES, INK_CONSUMPTIONS,
} from "./seed-data";

const round4 = (n: number) => Math.round(n * 10000) / 10000;

function sizeMm(code: string): number | null {
  const match = /^(\d+(?:\.\d+)?)\s*mm/i.exec(code.trim());
  return match ? Number(match[1]) : null;
}

function fillWeights(rows: typeof MATERIALS): Map<string, number> {
  const priced = rows.filter((r) => r.weight != null && r.weight > 0 && sizeMm(r.code));
  const globalRatio =
    priced.reduce((sum, r) => sum + r.weight! / sizeMm(r.code)!, 0) / (priced.length || 1);

  const familyRatio = new Map<string, number>();
  for (const row of rows) {
    const key = row.description ?? "";
    const peers = priced.filter((p) => (p.description ?? "") === key);
    if (peers.length > 0 && !familyRatio.has(key)) {
      familyRatio.set(key, peers.reduce((s, p) => s + p.weight! / sizeMm(p.code)!, 0) / peers.length);
    }
  }

  const filled = new Map<string, number>();
  for (const row of rows) {
    if (row.weight != null && row.weight > 0) {
      filled.set(row.code, round4(row.weight));
      continue;
    }
    const mm = sizeMm(row.code);
    const ratio = familyRatio.get(row.description ?? "") ?? globalRatio;
    filled.set(row.code, mm ? round4(mm * ratio) : 1);
  }
  return filled;
}

async function seedMaterials() {
  const weights = fillWeights(MATERIALS);
  const estimated = MATERIALS.filter((m) => m.weight == null || m.weight <= 0).length;

  await Promise.all(
    MATERIALS.map((row) => {
      const weight = String(weights.get(row.code)!);
      return db
        .insert(materials)
        .values({
          code: row.code,
          type: row.type,
          description: row.description,
          weightPerRoll: weight,
        })
        .onConflictDoUpdate({
          target: materials.code,
          set: {
            type: row.type,
            description: row.description,
            weightPerRoll:
              row.weight != null && row.weight > 0
                ? String(round4(row.weight))
                : weight,
          },
        });
    })
  );
  console.log(`materials      ${MATERIALS.length} upserted (${estimated} estimated weights)`);
}

async function seedOperators() {
  const byName = new Map<string, number>();
  for (const row of OPERATORS) {
    const [saved] = await db
      .insert(operators)
      .values({ ...row, status: "Active" })
      .onConflictDoUpdate({
        target: operators.name,
        set: { designation: row.designation, employeeCode: row.employeeCode, updatedAt: new Date() },
      })
      .returning();
    byName.set(row.name, saved.id);
  }
  console.log(`operators      ${OPERATORS.length} upserted`);
  return byName;
}

async function seedMachines(operatorIds: Map<string, number>) {
  const existing = await db.select({ id: machines.id }).from(machines);
  const existingIds = new Set(existing.map((m) => m.id));
  const claimed = new Set<string>();

  const MACHINE_TAKEOVERS: Record<number, string> = {
    1: "SR Flexo 2+1",
    2: "HC004",
    3: "AS001",
  };

  for (const [id, name] of Object.entries(MACHINE_TAKEOVERS)) {
    if (!existingIds.has(Number(id))) continue;
    const row = MACHINES.find((m) => m.name === name)!;
    await db
      .update(machines)
      .set({
        name: row.name,
        machineCode: row.machineCode,
        machineName: row.name,
        machineType: row.machineType,
        capacityPerHour: row.capacityPerHour,
        machineOperatorId: row.operatorName ? operatorIds.get(row.operatorName)! : null,
        status: "Active",
        updatedAt: new Date(),
      })
      .where(eq(machines.id, Number(id)));
    claimed.add(row.name);
  }

  for (const row of MACHINES) {
    if (claimed.has(row.name)) continue;
    await db
      .insert(machines)
      .values({
        name: row.name,
        machineCode: row.machineCode,
        machineName: row.name,
        machineType: row.machineType,
        capacityPerHour: row.capacityPerHour,
        machineOperatorId: row.operatorName ? operatorIds.get(row.operatorName)! : null,
        status: "Active",
      })
      .onConflictDoUpdate({
        target: machines.machineCode,
        set: {
          name: row.name,
          machineName: row.name,
          machineType: row.machineType,
          capacityPerHour: row.capacityPerHour,
          machineOperatorId: row.operatorName ? operatorIds.get(row.operatorName)! : null,
          updatedAt: new Date(),
        },
      });
  }
  console.log(`machines       ${MACHINES.length} upserted (${claimed.size} re-pointed in place)`);
}

async function seedUsers() {
  const passwordHash = await bcrypt.hash("Seed123!@#", 12);
  for (const row of USERS) {
    const email = `${row.name.toLowerCase().replace(/[^a-z]+/g, ".")}@3q.test`;
    await db
      .insert(users)
      .values({ name: row.name, role: row.role, email, passwordHash })
      .onConflictDoUpdate({ target: users.email, set: { name: row.name, role: row.role, updatedAt: new Date() } });
  }
  console.log(`users          ${USERS.length} upserted`);
}

async function seedCompanies() {
  let brandCount = 0;
  await Promise.all(
    COMPANIES.map(async (row) => {
      const [company] = await db
        .insert(companies)
        .values({
          name: row.name,
          email: row.email,
          location: row.location,
          contactPerson: row.contactPerson,
          phone: row.phone,
        })
        .onConflictDoUpdate({
          target: companies.name,
          set: { email: row.email, location: row.location, contactPerson: row.contactPerson, phone: row.phone },
        })
        .returning();

      for (const brandName of row.brands) {
        await db
          .insert(brands)
          .values({ companyId: company.id, name: brandName })
          .onConflictDoNothing();
        brandCount += 1;
      }
    })
  );
  console.log(`companies      ${COMPANIES.length} upserted, ${brandCount} brands ensured`);
}

async function seedStock() {
  const weightByCode = new Map<string, number>();

  for (const row of PURCHASE_SEEDS) {
    const weightPerRoll = Number(row.localWeight ?? "0.5");
    weightByCode.set(row.materialCode, weightPerRoll);

    await db.insert(purchaseRecords).values({
      reportDate: row.reportDate,
      materialCode: row.materialCode,
      materialType: row.description,
      itemName: row.itemName,
      vendor: row.vendor,
      invoiceNumber: row.invoiceNumber,
      gdNumber: row.gdNumber,
      cartonQty: row.cartonQty,
      rollsPerCarton: row.rollsPerCarton,
      totalRoll: String(row.totalRoll),
      rollLength: String(row.rollLength),
      netWeight: String(row.netWeight),
      totalRollPer200m: String(row.totalRollPer200m),
      invoiceWeight: String(row.invoiceWeight),
      localWeight: String(row.localWeight),
      efs: row.isEfs ? "yes" : "no",
    });
  }

  const stockByCode = new Map<string, number>();
  for (const row of PURCHASE_SEEDS) {
    stockByCode.set(row.materialCode, (stockByCode.get(row.materialCode) ?? 0) + row.totalRoll);
  }

  let ledgers = 0;
  for (const [code, totalRolls] of stockByCode.entries()) {
    const weightPerRoll = Number(weightByCode.get(code) ?? 0.5);
    const rollPerKg = weightPerRoll > 0 ? round4(1 / weightPerRoll) : 1;

    await db.insert(inventoryRolls).values({
      materialCode: code,
      openingStock: "0",
      receivedRolls: String(totalRolls),
      issuedRolls: "0",
      balanceRolls: String(totalRolls),
      rollPerKg: String(rollPerKg),
    });
    ledgers += 1;
  }

  console.log(`purchases      ${PURCHASE_SEEDS.length} created, ${ledgers} stock ledger(s) created`);
}

async function seedLabelTypes() {
  let created = 0;
  for (const row of LABEL_TYPES) {
    await db
      .insert(labelTypes)
      .values({ name: row.name, category: row.category })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`label types    ${LABEL_TYPES.length} ensured`);
}

async function seedThreadServiceProviders() {
  let created = 0;
  for (const row of THREAD_SERVICE_PROVIDERS) {
    await db
      .insert(threadServiceProviders)
      .values({
        name: row.name,
        contact: row.contact,
        address: row.address,
        notes: row.notes,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`thread providers  ${THREAD_SERVICE_PROVIDERS.length} ensured`);
}

async function seedThreadStocks() {
  let created = 0;
  for (const row of THREAD_STOCKS) {
    await db
      .insert(threadStocks)
      .values({
        stockType: row.stockType,
        denier: row.denier,
        colorName: row.colorName,
        colorCode: row.colorCode,
        balanceKg: String(row.balanceKg),
        receivedKg: String(row.receivedKg),
        consumedKg: String(row.consumedKg),
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`thread stocks    ${THREAD_STOCKS.length} ensured`);
}

async function seedThreadPurchases() {
  let created = 0;
  for (const row of THREAD_PURCHASES) {
    const totalWeightKg = String(row.totalCtns * row.weightPerCtnKg);
    await db
      .insert(threadPurchases)
      .values({
        receivedDate: row.receivedDate,
        itemName: "Thread",
        denier: row.denier,
        threadColor: row.threadColor,
        vendor: row.vendor,
        invoiceNumber: row.invoiceNumber,
        totalCtns: row.totalCtns,
        weightPerCtnKg: String(row.weightPerCtnKg),
        totalWeightKg,
        notes: row.notes,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`thread purchases  ${THREAD_PURCHASES.length} ensured`);
}

async function seedThreadDyeingSends(providerIds: Map<string, number>) {
  let created = 0;
  for (const row of THREAD_DYEING_SENDS) {
    const providerId = providerIds.get(row.serviceProviderName);
    if (!providerId) {
      console.warn(`  skipping send "${row.serviceProviderName}" — provider not found`);
      continue;
    }
    await db
      .insert(threadDyeingSends)
      .values({
        serviceProviderId: providerId,
        sendingDate: row.sendingDate,
        senderTrackingNumber: row.senderTrackingNumber,
        denier: row.denier,
        baseThreadColor: row.baseThreadColor,
        totalWeightSent: String(row.totalWeightSent),
        status: row.status,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`thread dyeing sends  ${THREAD_DYEING_SENDS.length} ensured`);
}

async function seedThreadDyeingAllocations(sendIds: number[]) {
  let created = 0;
  for (const row of THREAD_DYEING_ALLOCATIONS) {
    const sendId = sendIds[row.sendIndex];
    if (!sendId) {
      console.warn(`  skipping allocation for send index ${row.sendIndex} — send not found`);
      continue;
    }
    await db
      .insert(threadDyeingAllocations)
      .values({
        threadDyeingSendId: sendId,
        colorName: row.colorName,
        pantone: row.pantone,
        colorCode: row.colorCode,
        allocatedWeight: String(row.allocatedWeight),
        receivedWeight: row.receivedWeight != null ? String(row.receivedWeight) : null,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`thread dyeing allocations  ${THREAD_DYEING_ALLOCATIONS.length} ensured`);
}

async function seedThreadDyeingReceives(sendIds: number[]) {
  let created = 0;
  for (const row of THREAD_DYEING_RECEIVES) {
    const sendId = sendIds[row.sendIndex];
    if (!sendId) {
      console.warn(`  skipping receive for send index ${row.sendIndex} — send not found`);
      continue;
    }
    await db
      .insert(threadDyeingReceives)
      .values({
        threadDyeingSendId: sendId,
        receivingDate: row.receivingDate,
        receiverTrackingNumber: row.receiverTrackingNumber,
        invoiceNumber: row.invoiceNumber,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`thread dyeing receives  ${THREAD_DYEING_RECEIVES.length} ensured`);
}

async function seedThreadDyeBatches(stockIds: Map<string, number>, userIds: number[]) {
  let created = 0;
  for (const row of THREAD_DYE_BATCHES) {
    const fromKey = `${row.fromStockName} ${row.fromStockColorCode ?? ""}`.trim();
    const toKey = `${row.toStockName} ${row.toStockColorCode}`.trim();

    const fromStockId = stockIds.get(fromKey);
    const toStockId = stockIds.get(toKey);

    if (!fromStockId) {
      console.warn(`  skipping dye batch "${row.colorName}" — from stock "${fromKey}" not found`);
      continue;
    }
    if (!toStockId) {
      console.warn(`  skipping dye batch "${row.colorName}" — to stock "${toKey}" not found`);
      continue;
    }

    const actorUserId = userIds[0];

    await db
      .insert(threadDyeBatches)
      .values({
        batchNumber: `DB-${Date.now()}-${created + 1}`,
        fromStockId,
        toStockId,
        denier: row.denier,
        colorName: row.colorName,
        colorCode: row.colorCode,
        inputWeightKg: String(row.inputWeightKg),
        outputWeightKg: String(row.outputWeightKg),
        notes: row.notes,
        actorUserId,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`thread dye batches  ${THREAD_DYE_BATCHES.length} ensured`);
}

async function seedStickerMaterials() {
  let created = 0;
  for (const row of STICKER_MATERIALS) {
    const totalWeight = String(row.rollQuantity * row.weightPerRoll);
    await db
      .insert(stickerMaterials)
      .values({
        invoiceDate: row.invoiceDate,
        stickerSize: row.stickerSize,
        materialCode: row.materialCode,
        rollQuantity: String(row.rollQuantity),
        weightPerRoll: String(row.weightPerRoll),
        totalWeight,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`sticker materials  ${STICKER_MATERIALS.length} ensured`);
}

async function seedLocalSheets() {
  let created = 0;
  for (const row of LOCAL_SHEETS) {
    const totalWeight = String(row.packetQuantity * row.packetWeight);
    await db
      .insert(localSheets)
      .values({
        date: row.date,
        materialCode: row.materialCode,
        packetQuantity: String(row.packetQuantity),
        packetWeight: String(row.packetWeight),
        totalWeight,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`local sheets  ${LOCAL_SHEETS.length} ensured`);
}

async function seedLabelSheets() {
  let created = 0;
  for (const row of LABEL_SHEETS) {
    const totalWeight = String(row.sheetQuantity * row.weightPerSheet);
    await db
      .insert(labelSheets)
      .values({
        date: row.date,
        materialCode: row.materialCode,
        sheetQuantity: String(row.sheetQuantity),
        weightPerSheet: String(row.weightPerSheet),
        totalWeight,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`label sheets  ${LABEL_SHEETS.length} ensured`);
}

async function seedInkPurchases() {
  let created = 0;
  for (const row of INK_PURCHASES) {
    const totalWeight = String(row.quantity * row.weightPerQty);
    await db
      .insert(inkPurchases)
      .values({
        reportDate: row.reportDate,
        materialCode: row.materialCode,
        vendor: row.vendor,
        invoiceNumber: row.invoiceNumber,
        quantity: String(row.quantity),
        weightPerQty: String(row.weightPerQty),
        totalWeight,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`ink purchases  ${INK_PURCHASES.length} ensured`);
}

async function seedInkConsumptions(operatorIds: Map<string, number>) {
  let created = 0;
  for (const row of INK_CONSUMPTIONS) {
    const operatorId = row.operatorName ? operatorIds.get(row.operatorName) : null;
    await db
      .insert(inkConsumptions)
      .values({
        materialCode: row.materialCode,
        qtyAssigned: String(row.qtyAssigned),
        operatorId,
        operatorName: row.operatorName,
        weight: String(row.weight),
        note: row.note,
      })
      .onConflictDoNothing();
    created += 1;
  }
  console.log(`ink consumptions  ${INK_CONSUMPTIONS.length} ensured`);
}

async function main() {
  console.log("Seeding master data (all tables except work orders & production)...\n");

  await seedMaterials();
  const operatorIds = await seedOperators();
  await seedMachines(operatorIds);
  await seedUsers();
  await seedCompanies();
  await seedStock();
  await seedLabelTypes();

  await seedThreadServiceProviders();
  const providerRows = await db.select({ id: threadServiceProviders.id, name: threadServiceProviders.name }).from(threadServiceProviders);
  const providerIds = new Map(providerRows.map((r) => [r.name, r.id]));

  await seedThreadStocks();
  await seedThreadPurchases();
  await seedThreadDyeingSends(providerIds);

  const sendRows = await db.select({ id: threadDyeingSends.id }).from(threadDyeingSends);
  const sendIds = sendRows.map((r) => r.id);

  await seedThreadDyeingAllocations(sendIds);
  await seedThreadDyeingReceives(sendIds);

  const stockRows = await db.select({ id: threadStocks.id, stockType: threadStocks.stockType, denier: threadStocks.denier, colorName: threadStocks.colorName, colorCode: threadStocks.colorCode }).from(threadStocks);
  const stockIds = new Map<string, number>();
  for (const row of stockRows) {
    const key = `${row.colorName} ${row.colorCode ?? ""}`.trim();
    stockIds.set(key, row.id);
  }

  const userRows = await db.select({ id: users.id }).from(users);
  const userIds = userRows.map((r) => r.id);

  await seedThreadDyeBatches(stockIds, userIds);

  await seedStickerMaterials();
  await seedLocalSheets();
  await seedLabelSheets();
  await seedInkPurchases();
  await seedInkConsumptions(operatorIds);

  console.log("\nDone.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Master-data seed failed:", error);
    process.exit(1);
  });
