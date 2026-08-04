import { StatusBadge, type StatusVariant } from "@/components/feedback/StatusBadge";
import type { ProductionLineStatus, ProductionOrderStatus } from "../types";

const ORDER_STATUS: Record<ProductionOrderStatus, { label: string; variant: StatusVariant }> = {
  planned: { label: "Planned", variant: "info" },
  production: { label: "Production", variant: "active" },
  complete: { label: "Complete", variant: "completed" },
};

const LINE_STATUS: Record<ProductionLineStatus, { label: string; variant: StatusVariant }> = {
  pending: { label: "Pending", variant: "pending" },
  active: { label: "Active", variant: "active" },
  paused: { label: "Paused", variant: "paused" },
  completed: { label: "Completed", variant: "completed" },
  cancelled: { label: "Cancelled", variant: "cancelled" },
};

export function ProductionOrderStatusBadge({ status }: { status: ProductionOrderStatus }) {
  const entry = ORDER_STATUS[status];
  return <StatusBadge variant={entry.variant}>{entry.label}</StatusBadge>;
}

export function ProductionLineStatusBadge({ status }: { status: ProductionLineStatus }) {
  const entry = LINE_STATUS[status];
  return <StatusBadge variant={entry.variant}>{entry.label}</StatusBadge>;
}

export { ORDER_STATUS as PRODUCTION_ORDER_STATUS_META };
