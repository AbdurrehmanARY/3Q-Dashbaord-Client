/**
 * Client-side mirror of the label-type constants and size-plan helpers.
 *
 * `LABEL_TYPES` is the dropdown the planning forms offer. The validation that a Size
 * Label's sizes sum to the line quantity lives on the server (see
 * `@api/constants/labels` + the API tests); this file only shapes what the UI can display.
 */

/**
 * `SizeLabel` is the variant whose batch assignment is split by size.
 * The value is the canonical string saved to the database.
 */
export const LABEL_TYPES = ["Size Label", "Care Label", "Main Label", "Address Label", "Warning Label", "Composition Label", "Import Label", "Poly Import Label"] as const;
export type LabelType = (typeof LABEL_TYPES)[number];

/** One planned size variant: `{ size: "XL", quantity: 200 }`. */
export interface SizePlan {
  size: string;
  quantity: number;
}

/**
 * "size label" regardless of case or surrounding spaces, so a legacy hand-typed value
 * is still recognised and given the size editor.
 */
export function isSizeLabel(labelType?: string | null): boolean {
  return !!labelType && labelType.trim().toLowerCase() === "size label";
}

/** Display-friendly label for a planned size, e.g. "XL (200 pcs)". */
export function sizeLabel(s: SizePlan): string {
  return `${s.size} (${s.quantity} pcs)`;
}
