export interface PurchaseRecord {
  id: string;
  reportDate: string;
  materialCode: string;
  materialType: string | null;
  itemName: string | null;
  invoiceNumber: string | null;
  vendor: string;
  cartonQty: number;
  rollsPerCarton: number;
  totalRoll: string | null;
  rollLength: string;
  netWeight: string;
  efs: string | null;
  /** Server-calculated: totalRoll * (rollLength / 200). Never user-entered. */
  totalRollPer200m: string | null;
  /** Server-calculated: (netWeight * 200) / (totalRoll * rollLength). Never user-entered. */
  invoiceWeight: string | null;
  /** Copied from the purchased material's `weightPerRoll`. Never user-entered. */
  localWeight: string | null;
  gdNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * `totalRoll`, `totalRollPer200m`, `invoiceWeight` and `localWeight` are all calculated
 * server-side and are deliberately absent here — see `PurchaseRecord` for where they
 * show up once the server has computed them.
 */
export interface PurchaseInput {
  reportDate: string;
  materialCode: string;
  vendor: string;
  invoiceNumber: string;
  cartonQty: number;
  rollsPerCarton: number;
  rollLength: number;
  netWeight: number;
  efs?: string;
  gdNumber?: string;
}
