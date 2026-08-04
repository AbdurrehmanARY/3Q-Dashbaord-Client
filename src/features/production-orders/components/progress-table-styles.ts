import { stickyCellClass as sharedStickyCellClass } from "@/shared/components/data-table";

/**
 * Column definitions for the Production Progress table, shared by the header
 * (`EditableLabelTypeTable`) and the body (`LabelTypeRow`) so the two can never drift out
 * of alignment — the bug that made the wide table look ragged.
 */
export interface ProgressColumn {
  label: string;
  /** Numeric columns are right-aligned so digits line up down the column. */
  align?: "right";
  /** Identity and Actions stay put while the middle scrolls horizontally. */
  sticky?: "first" | "last";
}

export const PROGRESS_COLUMNS: ProgressColumn[] = [
  { label: "Label Type", sticky: "first" },
  { label: "Planned Rolls", align: "right" },
  { label: "Printed", align: "right" },
  { label: "Printing Machine" },
  { label: "Printed By" },
  { label: "Sent to Cutting", align: "right" },
  { label: "Cut", align: "right" },
  { label: "Cutting Machine" },
  { label: "Cut By" },
  { label: "Sent to Packaging", align: "right" },
  { label: "Packaged", align: "right" },
  { label: "Packaged Qty", align: "right" },
  { label: "Packaged By" },
  { label: "Completion" },
  { label: "Actions", sticky: "last" },
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
