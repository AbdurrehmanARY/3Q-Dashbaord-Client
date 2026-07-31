import { cn } from "@/lib/utils";

/**
 * Classes that freeze a column at the left or right edge of a horizontally scrolling table.
 *
 * A frozen cell needs an OPAQUE background of its own, or the scrolling cells slide visibly
 * underneath it. `bg-card` provides that fill; any row tint (header shading, a selected or
 * editing row) is layered on as a background-IMAGE — a flat one-colour gradient — because a
 * second `bg-*` class would simply replace the fill rather than composite over it. The edge
 * shadow is what makes the freeze read as deliberate rather than as clipped content.
 *
 * Use with plain `<Table>` markup. `DataTable` has `stickyFirstColumn`/`stickyLastColumn`
 * props that apply the same treatment for column-driven tables.
 */
export function stickyCellClass(
  edge: "first" | "last" | undefined,
  opts: { header?: boolean; tint?: "muted" | "primary" } = {}
): string | undefined {
  if (!edge) return undefined;
  return cn(
    "sticky bg-card",
    edge === "first"
      ? "left-0 shadow-[1px_0_0_0_hsl(var(--border))]"
      : "right-0 shadow-[-1px_0_0_0_hsl(var(--border))]",
    // Header cells sit above body cells so they stay opaque when both axes scroll.
    opts.header ? "z-20" : "z-10",
    opts.tint === "muted" && "bg-[linear-gradient(hsl(var(--muted)/0.3),hsl(var(--muted)/0.3))]",
    opts.tint === "primary" && "bg-[linear-gradient(hsl(var(--primary)/0.05),hsl(var(--primary)/0.05))]"
  );
}
