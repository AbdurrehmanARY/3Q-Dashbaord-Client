import { inventoryRollRepository } from "../repositories/inventory-roll.repository";
import { materialRepository } from "../repositories/material.repository";
import { ConflictError, NotFoundError } from "../utils/ApiError";
import { Messages } from "../constants/messages";
import type { InventoryRoll } from "@db/schema";

/** An inventory ledger row plus the computed, read-only per-SKU balance. */
export type InventoryRollWithComputed = InventoryRoll & { perSkuBalance: string };

/** Per-SKU balance = remaining (balance) rolls × rolls-per-kg. Always derived, never stored. */
function withPerSkuBalance(roll: InventoryRoll): InventoryRollWithComputed {
  const perSkuBalance = Number(roll.balanceRolls) * Number(roll.rollPerKg);
  return { ...roll, perSkuBalance: String(perSkuBalance) };
}

export class InventoryRollService {
  async getInventoryRolls(filters?: { materialCode?: string }): Promise<InventoryRollWithComputed[]> {
    const rolls = await inventoryRollRepository.findAll(filters);
    return rolls.map(withPerSkuBalance);
  }

  async getInventoryRollByMaterialCode(materialCode: string): Promise<InventoryRollWithComputed> {
    const roll = await inventoryRollRepository.findByMaterialCode(materialCode);
    if (!roll) throw new NotFoundError(Messages.notFound("Inventory roll"));
    return withPerSkuBalance(roll);
  }

  async createInventoryRoll(data: {
    materialCode: string;
    openingStock?: number;
    receivedRolls?: number;
    issuedRolls?: number;
    balanceRolls?: number;
    rollPerKg?: number;
  }): Promise<InventoryRollWithComputed> {
    const material = await materialRepository.findByCode(data.materialCode);
    if (!material) throw new NotFoundError(Messages.notFound("Material"));

    const existing = await inventoryRollRepository.findByMaterialCode(data.materialCode);
    if (existing) throw new ConflictError("Inventory roll for this material already exists");

    const openingStock = data.openingStock ?? 0;
    const receivedRolls = data.receivedRolls ?? 0;
    const issuedRolls = data.issuedRolls ?? 0;
    const balanceRolls = data.balanceRolls ?? openingStock + receivedRolls - issuedRolls;

    const roll = await inventoryRollRepository.create({
      materialCode: data.materialCode,
      openingStock: String(openingStock),
      receivedRolls: String(receivedRolls),
      issuedRolls: String(issuedRolls),
      balanceRolls: String(balanceRolls),
      rollPerKg: String(data.rollPerKg ?? 0),
    });
    return withPerSkuBalance(roll);
  }

  async updateInventoryRoll(materialCode: string, data: {
    openingStock?: number;
    receivedRolls?: number;
    issuedRolls?: number;
    balanceRolls?: number;
    rollPerKg?: number;
  }): Promise<InventoryRollWithComputed> {
    const roll = await inventoryRollRepository.findByMaterialCode(materialCode);
    if (!roll) throw new NotFoundError(Messages.notFound("Inventory roll"));

    const updated = await inventoryRollRepository.update(materialCode, {
      openingStock: data.openingStock !== undefined ? String(data.openingStock) : undefined,
      receivedRolls: data.receivedRolls !== undefined ? String(data.receivedRolls) : undefined,
      issuedRolls: data.issuedRolls !== undefined ? String(data.issuedRolls) : undefined,
      balanceRolls: data.balanceRolls !== undefined ? String(data.balanceRolls) : undefined,
      rollPerKg: data.rollPerKg !== undefined ? String(data.rollPerKg) : undefined,
    });
    if (!updated) throw new NotFoundError(Messages.notFound("Inventory roll"));
    return withPerSkuBalance(updated);
  }

  async deleteInventoryRoll(materialCode: string): Promise<void> {
    const roll = await inventoryRollRepository.findByMaterialCode(materialCode);
    if (!roll) throw new NotFoundError(Messages.notFound("Inventory roll"));
    await inventoryRollRepository.delete(materialCode);
  }
}

export const inventoryRollService = new InventoryRollService();
