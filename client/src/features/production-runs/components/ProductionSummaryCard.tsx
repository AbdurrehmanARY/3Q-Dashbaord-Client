import { ClipboardList, CheckCircle2, Package } from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { formatNumber } from "@/lib/format";
import type { ProductionSummary } from "../types";

/** Ordered vs produced vs remaining — all derived server-side from SUM(quantity_produced). */
export function ProductionSummaryCard({ summary }: { summary: ProductionSummary }) {
  const remainingColor =
    summary.remainingQuantity <= 0 ? "bg-success/10 text-success" : "bg-warning/10 text-warning";

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        title="Ordered Quantity"
        value={formatNumber(summary.orderedQuantity, 0)}
        icon={ClipboardList}
      />
      <StatCard
        title="Total Produced"
        value={formatNumber(summary.totalProduced, 0)}
        description={`${summary.history.length} run${summary.history.length === 1 ? "" : "s"} logged`}
        icon={CheckCircle2}
        iconColor="bg-primary/10 text-primary"
      />
      <StatCard
        title="Remaining Quantity"
        value={formatNumber(summary.remainingQuantity, 0)}
        description={summary.remainingQuantity <= 0 ? "Fully produced" : "Still to produce"}
        icon={Package}
        iconColor={remainingColor}
      />
    </div>
  );
}
