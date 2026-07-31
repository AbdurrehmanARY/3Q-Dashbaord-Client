import { cn } from "@/lib/utils";

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
 * Classes that freeze a column in place during horizontal scroll.
 *
 * A frozen cell needs an OPAQUE background of its own or the scrolling cells slide visibly
 * underneath it. `bg-card` provides that fill; the row-state tint (header shading, or the
 * editing highlight) is layered on as a background-IMAGE — a flat one-colour gradient — so
 * it composites over the fill within a single element, which a second `bg-*` class cannot
 * do. The edge shadow is what makes the freeze read as deliberate rather than as clipping.
 */
export function stickyCellClass(
  sticky: ProgressColumn["sticky"],
  opts: { editing?: boolean; header?: boolean } = {}
): string | undefined {
  if (!sticky) return undefined;
  return cn(
    "sticky bg-card",
    sticky === "first"
      ? "left-0 shadow-[1px_0_0_0_hsl(var(--border))]"
      : "right-0 shadow-[-1px_0_0_0_hsl(var(--border))]",
    // Header cells sit above body cells so they stay opaque when both axes scroll.
    opts.header
      ? "z-20 bg-[linear-gradient(hsl(var(--muted)/0.3),hsl(var(--muted)/0.3))]"
      : "z-10",
    opts.editing && "bg-[linear-gradient(hsl(var(--primary)/0.05),hsl(var(--primary)/0.05))]"
  );
}
