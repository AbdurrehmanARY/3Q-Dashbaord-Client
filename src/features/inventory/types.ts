export interface StockLevel {
  id: string;
  materialCode: string;
  openingStock: string;
  receivedRolls: string;
  issuedRolls: string;
  balanceRolls: string;
  rollPerKg?: string;
  perSkuBalance?: string;
  createdAt: string;
  updatedAt: string;
  // Computed client-side joined fields
  itemName?: string;
  materialType?: string;
  rollLength?: number;
  weightPerRoll?: number | string;
  status?: "in-stock" | "low-stock" | "out-of-stock";
}

export interface PurchaseRecord {
  id: string;
  reportDate: string;
  materialCode: string;
  materialType: string;
  itemName: string;
  vendor: string;
  cartonQty: number;
  rollsPerCarton: number;
  totalRoll: number;
  rollLength: number;
  netWeight: number;
  efs: string | null;
  invoiceWeight: number | null;
  localWeight: number | null;
  gdNumber: string | null;
  isApproved: boolean;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseInput {
  reportDate: string;
  materialCode: string;
  materialType: string;
  itemName: string;
  vendor: string;
  cartonQty: number;
  rollsPerCarton: number;
  totalRoll: number;
  rollLength: number;
  netWeight: number;
  efs?: string;
  invoiceWeight?: number;
  localWeight?: number;
  gdNumber?: string;
}
