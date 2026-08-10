import { useState } from "react";
import { Plus } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductionSummary } from "../hooks/use-production-runs";
import { ProductionSummaryCard } from "./ProductionSummaryCard";
import { ProductionHistoryTable } from "./ProductionHistoryTable";
import { LogProductionRunDialog } from "./LogProductionRunDialog";

/**
 * Drop-in Production Runs panel for a sale order (work order): summary figures, the
 * append-only history, and the log-a-run action.
 */
export function ProductionRunsSection({ saleOrderId }: { saleOrderId: number }) {
  const { data: summary, isLoading } = useProductionSummary(saleOrderId);

  return (
    <div className="space-y-4">
      {isLoading || !summary ? (
        <Skeleton className="h-28 w-full" />
      ) : (
        <ProductionSummaryCard summary={summary} />
      )}
    </div>
  );
}
