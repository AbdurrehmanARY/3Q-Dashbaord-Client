import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Cross-cutting layout context (tooltip delay grouping today). The sidebar/header shell
 * itself is a route element — `shared/layouts/AppLayout` — because it only wraps pages.
 */
export function LayoutProvider({ children }: { children: ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
