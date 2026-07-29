import { db } from "@db/index";
import { operators } from "@db/schema";
import { eq, asc, and } from "drizzle-orm";
import type { Operator } from "@db/schema";

export class OperatorRepository {
  async findAll(filters?: { designation?: string; includeInactive?: boolean }) {
    const conditions = [];
    if (filters?.designation) conditions.push(eq(operators.designation, filters.designation));
    if (!filters?.includeInactive) conditions.push(eq(operators.isActive, true));
    return db
      .select()
      .from(operators)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(operators.name));
  }

  async findById(id: number | string) {
    const [operator] = await db.select().from(operators).where(eq(operators.id, Number(id)));
    return operator;
  }

  async create(data: { name: string; employeeCode?: string; designation: string; shift?: string; status: string }) {
    const [operator] = await db.insert(operators).values(data).returning();
    return operator;
  }

  async update(id: number | string, data: { name?: string; employeeCode?: string; designation?: string; shift?: string; status?: string; isActive?: boolean }) {
    const [operator] = await db
      .update(operators)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(operators.id, Number(id)))
      .returning();
    return operator;
  }

  async softDelete(id: number | string) {
    const [operator] = await db
      .update(operators)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(operators.id, Number(id)))
      .returning();
    return operator;
  }
}

export const operatorRepository = new OperatorRepository();
