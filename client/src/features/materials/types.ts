export interface Material {
  id: string;
  code: string;
  type: string;
  description: string | null;
  weightPerRoll: string;
  minStockLevel: number;
  reorderQty: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialInput {
  code: string;
  type: string;
  description?: string;
  weightPerRoll: number;
  minStockLevel?: number;
  reorderQty?: number;
}
