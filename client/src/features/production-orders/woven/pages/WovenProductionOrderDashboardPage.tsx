// WovenProductionOrderDashboardPage.tsx
// Full production order dashboard for WOVEN labels on the operational route.
// Route: /production-order/woven/:id and /production-orders/woven/:id
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductionOrderDashboardBody } from "@/features/production-orders/components/ProductionOrderDashboardBody";
import { useWovenProductionOrderDetail } from "../hooks/use-woven-production-orders";
import { productionOrderService } from "@/features/production-orders/services/production-order-service";
import type { ProductionOrderTotals } from "@/features/production-orders/types";

function computeWovenTotals(order: { id: number; totalQty: number; lines: any[] }): ProductionOrderTotals {
  const lines = order.lines;
  const plannedQty = lines.reduce((sum: number, l: any) => sum + Number(l.quantity), 0);
  const totalRolls = lines.reduce((sum: number, l: any) => sum + Number(l.totalRolls), 0);
  const printedRolls = lines.reduce((sum: number, l: any) => sum + Number(l.printedRolls), 0);
  const cutRolls = lines.reduce((sum: number, l: any) => sum + Number(l.cutRolls), 0);
  const packagedRolls = lines.reduce((sum: number, l: any) => sum + Number(l.packagedRolls), 0);
  const packagedQty = lines.reduce((sum: number, l: any) => sum + Number(l.packagedQty), 0);
  const completionPct = totalRolls > 0 ? Math.round((packagedRolls / totalRolls) * 100) : 0;
  const waitingForCutting = Math.max(0, printedRolls - cutRolls);
  const waitingForPackaging = Math.max(0, cutRolls - packagedRolls);

  return {
    labelTypeCount: lines.length,
    plannedQty,
    unplannedQty: Math.max(0, order.totalQty - plannedQty),
    packagedQty,
    requiredRolls: totalRolls,
    extraRolls: 0,
    totalRolls,
    totalWeight: 0,
    assignedRolls: 0,
    assignedWeight: 0,
    issuedRolls: 0,
    pendingIssue: 0,
    printedRolls,
    unprintedRolls: Math.max(0, totalRolls - printedRolls),
    sentToCuttingRolls: cutRolls,
    cutRolls,
    sentToPackagingRolls: packagedRolls,
    packagedRolls,
    waitingForCutting,
    waitingForPackaging,
    completionPct,
    stageInventory: {
      plannedRolls: totalRolls,
      printedTotal: printedRolls,
      cuttedTotal: cutRolls,
      packagedTotal: packagedRolls,
      printedAvailable: waitingForCutting,
      cuttedAvailable: waitingForPackaging,
      printable: Math.max(0, totalRolls - printedRolls),
      cuttable: Math.max(0, printedRolls - cutRolls),
      packagable: Math.max(0, cutRolls - packagedRolls),
      remainingRolls: Math.max(0, totalRolls - packagedRolls),
      isReadyForCompletion: packagedRolls >= totalRolls && totalRolls > 0,
    },
  };
}

export function WovenProductionOrderDashboardPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: orderData, isLoading, isError } = useWovenProductionOrderDetail(id);
  const order = orderData?.data;
  const lines = orderData?.lines ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} className="h-28 w-full" />))}</div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        Production order not found.
      </div>
    );
  }

  const totals = computeWovenTotals({ ...order, lines });

  const orderWithType = {
    ...order,
    productType: "woven",
  } as unknown as import("@/features/production-orders/types").ProductionOrderHeader;

  return (
    <ProductionOrderDashboardBody
      id={String(order.id)}
      order={orderWithType}
      lines={lines as unknown as import("@/features/production-orders/types").ProductionLineOverview[]}
      totals={totals}
      navigateBackUrl="/production-orders/woven"
      onComplete={async () => {
        await productionOrderService.completeOrder(String(order.id));
        navigate("/production-orders/woven");
      }}
      onDelete={async () => {
        await productionOrderService.remove(String(order.id));
        navigate("/production-orders/woven");
      }}
    />
  );
}

export default WovenProductionOrderDashboardPage;