import { db } from "@db/index";
import { inventoryRolls } from "@db/schema";
import { eq, asc, and } from "drizzle-orm";
import type { InventoryRoll } from "@db/schema";

export class InventoryRollRepository {
  async findAll(filters?: { materialCode?: string }) {
    const conditions = [];
    if (filters?.materialCode) conditions.push(eq(inventoryRolls.materialCode, filters.materialCode));
    return db
      .select()
      .from(inventoryRolls)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(inventoryRolls.materialCode));
  }

  async findByMaterialCode(materialCode: string) {
    const [roll] = await db.select().from(inventoryRolls).where(eq(inventoryRolls.materialCode, materialCode));
    return roll;
  }

  async create(data: {
    materialCode: string;
    openingStock?: string;
    receivedRolls?: string;
    issuedRolls?: string;
    balanceRolls?: string;
    rollPerKg?: string;
  }) {
    const [roll] = await db.insert(inventoryRolls).values(data).returning();
    return roll;
  }

  async update(materialCode: string, data: {
    openingStock?: string;
    receivedRolls?: string;
    issuedRolls?: string;
    balanceRolls?: string;
    rollPerKg?: string;
  }) {
    const [roll] = await db
      .update(inventoryRolls)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(inventoryRolls.materialCode, materialCode))
      .returning();
    return roll;
  }

  async delete(materialCode: string) {
    await db.delete(inventoryRolls).where(eq(inventoryRolls.materialCode, materialCode));
  }
}

export const inventoryRollRepository = new InventoryRollRepository();
