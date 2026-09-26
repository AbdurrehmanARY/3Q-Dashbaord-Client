import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Health-check shell — a lightweight debug/developer wrapper used by
 * `ClientHealthcheck` and any future probe consumers.
 *
 * Renders a labelled panel with a header, optional icon, and children.
 * Not exposed to the public UI; kept in `lib/healthcheck` to avoid
 * accidental bundling into production bundles when dev-only.
 */

interface HealthCheckShellProps {
  /** Panel heading. */
  title: string;
  /** Optional description shown below the title. */
  description?: string;
  /** Icon component rendered in the header. */
  icon?: React.ComponentType<{ className?: string }>;
  /** Additional className for the panel. */
  className?: string;
  /** Children rendered inside the panel body. */
  children: ReactNode;
}

export function HealthCheckShell({
  title,
  description,
  icon: Icon,
  className,
  children,
}: HealthCheckShellProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="size-4 text-muted-foreground" />}
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && (
          <span className="ml-auto text-[11px] text-muted-foreground">{description}</span>
        )}
      </div>
      <div className="text-[11px] text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
