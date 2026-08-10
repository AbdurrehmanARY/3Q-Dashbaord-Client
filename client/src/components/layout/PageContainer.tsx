import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Width presets for the page's content column. `default` is the app-wide standard; the
 * others exist so an occasional page (a focused form, a full-bleed dashboard) can opt out
 * without hand-rolling its own margins.
 */
const SIZES = {
  narrow: "max-w-4xl mx-auto",
  default: "w-full max-w-none",
  wide: "w-full max-w-none",
  full: "w-full max-w-none",
} as const;

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content-column width. Defaults to full responsive width. */
  size?: keyof typeof SIZES;
}

export function PageContainer({
  size = "default",
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "w-full min-w-0 animate-fade-in px-4 py-4 sm:px-6 lg:px-8 sm:py-6",
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
