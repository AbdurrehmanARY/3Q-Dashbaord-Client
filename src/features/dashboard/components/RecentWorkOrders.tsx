import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { formatDate, formatNumber } from "@/lib/format";
import { useWorkOrders } from "@/features/work-orders";
import { WORK_ORDER_STATUS_META } from "@/features/work-orders/types";

/* ============================================================
   RecentWorkOrders — Compact work order list for dashboard.
   Shows last 5 orders with status and quick-view link.
   ============================================================ */

export function RecentWorkOrders() {
  const navigate = useNavigate();
  const { data, isLoading: loading } = useWorkOrders();

  const orders = (data ?? []).slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Work Orders</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/work-orders")}
          className="h-7 gap-1 text-xs text-muted-foreground"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="space-y-3 px-6 pb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
            No work orders yet
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {orders.map((wo) => (
              <div
                key={wo.id}
                className="flex cursor-pointer items-center justify-between px-6 py-3 transition-colors hover:bg-muted/40"
                onClick={() => navigate(`/work-orders/${wo.id}`)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate font-mono text-sm font-medium">
                      {wo.soNumber}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatDate(wo.orderDate)} · {formatNumber(wo.totalQty, 0)} units
                  </p>
                </div>
                <StatusBadge variant={WORK_ORDER_STATUS_META[wo.status].variant} showDot>
                  {WORK_ORDER_STATUS_META[wo.status].label}
                </StatusBadge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
