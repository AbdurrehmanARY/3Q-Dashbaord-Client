import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductionOrderOverview } from "../types";
import {
  useProductionOrderOverview,
  useDeleteProductionOrder,
  useCompleteProductionOrder,
} from "../hooks/use-production-orders";
import { ProductionOrderDashboardBody } from "../components/ProductionOrderDashboardBody";

/** The Production Manager dashboard: order header + batch-based Production Progress & Stage Inventory pipeline. */
export function ProductionOrderDashboardPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: overview, isLoading, isError, error } = useProductionOrderOverview(id);
  const deleteOrder = useDeleteProductionOrder();
  const completeOrder = useCompleteProductionOrder();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !overview) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {(error as Error)?.message ?? "Production order not found."}
      </div>
    );
  }

  const { productionOrder: order, lines, totals } = overview;
  return (
    <ProductionOrderDashboardBody
      id={id}
      order={order}
      lines={lines}
      totals={totals}
      navigateBackUrl="/production-orders"
      onComplete={async () => {
        await completeOrder.mutateAsync(id);
      }}
      onDelete={async () => {
        await deleteOrder.mutateAsync(id);
        navigate("/production-orders");
      }}
    />
  );
} 
