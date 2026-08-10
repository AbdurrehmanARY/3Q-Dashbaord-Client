import { stickyCellClass as sharedStickyCellClass } from "@/shared/components/data-table";

/**
 * Column definitions for the Production Progress table, shared by the header
 * (`EditableLabelTypeTable`) and the body (`LabelTypeRow`) so the two can never drift out
 * of alignment — the bug that made the wide table look ragged.
 */
export interface ProgressColumn {
  id: string;
  label: string;
  /** Numeric columns are right-aligned so digits line up down the column. */
  align?: "right";
  /** Identity and Actions stay put while the middle scrolls horizontally. */
  sticky?: "first" | "last";
  toggleable?: boolean;
}

export const PROGRESS_COLUMNS: ProgressColumn[] = [
  { id: "labelType", label: "Label Type", sticky: "first", toggleable: false },
  { id: "plannedRolls", label: "Planned Rolls", align: "right", toggleable: true },
  { id: "unprinted", label: "Printing (Unprinted)", align: "right", toggleable: true },
  { id: "printed", label: "Printed", align: "right", toggleable: true },
  { id: "printingMachine", label: "Printing Machine", toggleable: true },
  { id: "printingOperator", label: "Printed By", toggleable: true },
  { id: "sentToCutting", label: "Sent to Cutting", align: "right", toggleable: true },
  { id: "cut", label: "Cut", align: "right", toggleable: true },
  { id: "cuttingMachine", label: "Cutting Machine", toggleable: true },
  { id: "cuttingOperator", label: "Cut By", toggleable: true },
  { id: "sentToPackaging", label: "Sent to Packaging", align: "right", toggleable: true },
  { id: "packaged", label: "Packaged", align: "right", toggleable: true },
  { id: "packagedQty", label: "Packaged Qty", align: "right", toggleable: true },
  { id: "packagingOperator", label: "Packaged By", toggleable: true },
  { id: "completion", label: "Completion", toggleable: true },
  { id: "actions", label: "Actions", sticky: "last", toggleable: false },
];

export const alignClass = (align?: "right") => (align === "right" ? "text-right" : undefined);

/**
 * Freezes the identity / actions column, delegating to the shared table helper so every
 * frozen column in the app looks and behaves identically. The only local concern is mapping
 * this table's row states (header shading, the editing highlight) onto its tint option.
 */
export function stickyCellClass(
  sticky: ProgressColumn["sticky"],
  opts: { editing?: boolean; header?: boolean } = {}
): string | undefined {
  return sharedStickyCellClass(sticky, {
    header: opts.header,
    tint: opts.header ? "muted" : opts.editing ? "primary" : undefined,
  });
}
