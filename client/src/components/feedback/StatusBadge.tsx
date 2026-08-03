import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        /* --- Work Order / Generic --- */
        draft:     "bg-muted text-muted-foreground ring-border",
        submitted: "bg-success/10 text-success ring-success/30",
        pending:   "bg-warning/10 text-warning ring-warning/30",
        approved:  "bg-success/10 text-success ring-success/30",
        rejected:  "bg-destructive/10 text-destructive ring-destructive/30",

        /* --- Production --- */
        active:    "bg-primary/10 text-primary ring-primary/30",
        completed: "bg-success/10 text-success ring-success/30",
        paused:    "bg-warning/10 text-warning ring-warning/30",
        cancelled: "bg-muted text-muted-foreground ring-border",

        /* --- Machine / Operator --- */
        online:    "bg-success/10 text-success ring-success/30",
        offline:   "bg-muted text-muted-foreground ring-border",
        idle:      "bg-warning/10 text-warning ring-warning/30",
        maintenance:"bg-destructive/10 text-destructive ring-destructive/30",

        /* --- Stock --- */
        "in-stock":    "bg-success/10 text-success ring-success/30",
        "low-stock":   "bg-warning/10 text-warning ring-warning/30",
        "out-of-stock":"bg-destructive/10 text-destructive ring-destructive/30",

        /* --- Generic --- */
        success:   "bg-success/10 text-success ring-success/30",
        warning:   "bg-warning/10 text-warning ring-warning/30",
        error:     "bg-destructive/10 text-destructive ring-destructive/30",
        info:      "bg-primary/10 text-primary ring-primary/30",
        neutral:   "bg-muted text-muted-foreground ring-border",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

type StatusVariant = VariantProps<typeof statusBadgeVariants>["variant"];

const DOT_COLORS: Partial<Record<NonNullable<StatusVariant>, string>> = {
  submitted: "bg-success",
  approved:  "bg-success",
  completed: "bg-success",
  online:    "bg-success",
  "in-stock":"bg-success",
  success:   "bg-success",
  active:    "bg-primary",
  info:      "bg-primary",
  pending:   "bg-warning",
  paused:    "bg-warning",
  idle:      "bg-warning",
  "low-stock":"bg-warning",
  warning:   "bg-warning",
  rejected:  "bg-destructive",
  cancelled: "bg-muted-foreground",
  maintenance:"bg-destructive",
  "out-of-stock":"bg-destructive",
  error:     "bg-destructive",
  draft:     "bg-muted-foreground",
  offline:   "bg-muted-foreground",
  neutral:   "bg-muted-foreground",
};

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({
  variant,
  children,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const dotColor = variant ? (DOT_COLORS[variant] ?? "bg-muted-foreground") : "bg-muted-foreground";

  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {showDot && (
        <span className={cn("size-1.5 rounded-full", dotColor)} />
      )}
      {children}
    </span>
  );
}

export { statusBadgeVariants, type StatusVariant };
