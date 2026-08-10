export type ReceiptKind = "stickers" | "local-sheets" | "label-sheets";

/** Flat receipt record — shape varies slightly per kind, so extra columns are open-ended. */
export interface MaterialReceipt {
  id: number;
  materialCode: string;
  totalWeight: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export type ReceiptFieldType = "text" | "number" | "date";

export interface ReceiptField {
  name: string;
  label: string;
  type: ReceiptFieldType;
  placeholder?: string;
}

export interface MaterialReceiptConfig {
  kind: ReceiptKind;
  title: string;
  description: string;
  entityName: string;
  /** Editable form fields (excludes the derived totalWeight). */
  fields: ReceiptField[];
  /** The two numeric field names whose product is shown as the live Total Weight preview. */
  multiplicands: [string, string];
}
