import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Width presets for the page's content column. `default` is the app-wide standard; the
 * others exist so an occasional page (a focused form, a full-bleed dashboard) can opt out
 * without hand-rolling its own margins.
 */
const SIZES = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
  full: "max-w-none",
} as const;

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content-column width. Defaults to the app-wide `max-w-7xl`. */
  size?: keyof typeof SIZES;
}

/**
 * The single owner of every page's outer margin, padding and max width. Rendered once in
 * `AppLayout` around the router outlet, so every route gets identical spacing for free —
 * pages should never re-add their own `p-*`/`mx-auto`/`max-w-*` wrapper. Reach for it
 * directly only to override the width on a specific page (`<PageContainer size="narrow">`).
 *
 * `min-w-0` is load-bearing: it stops this flex/grid child from growing to fit its widest
 * descendant (e.g. the many-column production-progress table), so that table scrolls inside
 * its own `overflow-x-auto` instead of pushing the page past the viewport.
 */
export function PageContainer({
  size = "default",
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 animate-fade-in px-4 py-4 sm:px-6 sm:py-6",
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
