/** Ink purchasing / stock / consumption. Decimal columns arrive from Postgres as strings. */

export interface InkPurchase {
  id: number;
  reportDate: string;
  materialCode: string;
  vendor: string;
  invoiceNumber: string | null;
  quantity: string;
  weightPerQty: string;
  totalWeight: string;
  createdAt: string;
}

export interface InkPurchaseInput {
  reportDate: string;
  materialCode: string;
  vendor: string;
  invoiceNumber?: string;
  quantity: number;
  weightPerQty: number;
}

/** Derived stock — the server already converts these to numbers. */
export interface InkStockRow {
  materialCode: string;
  purchasedQty: number;
  purchasedWeight: number;
  consumedQty: number;
  consumedWeight: number;
  balanceQty: number;
  balanceWeight: number;
}

export interface InkConsumption {
  id: number;
  materialCode: string;
  qtyAssigned: string;
  operatorId: number | null;
  operatorName: string | null;
  weight: string;
  note: string | null;
  consumedAt: string;
}

export interface InkConsumptionInput {
  materialCode: string;
  qtyAssigned: number;
  operatorId?: number;
  operatorName?: string;
  weight: number;
  note?: string;
}

export interface InkOperatorSummary {
  operatorId: number | null;
  operatorName: string;
  entries: string;
  totalQty: string;
  totalWeight: string;
}
