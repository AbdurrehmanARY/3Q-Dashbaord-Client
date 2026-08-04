import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { useInventoryStock } from "@/features/inventory";
import { useMaterials } from "@/features/materials";

export function LowStockAlert() {
  const navigate = useNavigate();
  const { data: stock, isLoading: stockLoading } = useInventoryStock();
  const { data: materials, isLoading: materialsLoading } = useMaterials();
  const loading = stockLoading || materialsLoading;

  const enrichedItems = (stock ?? []).map((roll) => {
    const mat = (materials ?? []).find((m) => m.code === roll.materialCode);
    const balance = Number(roll.balanceRolls) || 0;
    const status: "in-stock" | "low-stock" | "out-of-stock" =
      balance <= 0 ? "out-of-stock" : balance < 5 ? "low-stock" : "in-stock";
    return {
      ...roll,
      itemName: mat?.description ?? "Unknown Roll",
      materialType: mat?.type ?? "Other",
      status,
    };
  });

  const lowStockItems = enrichedItems.filter(
    (item) => item.status === "low-stock" || item.status === "out-of-stock"
  );

  return (
    <Card className="border-warning/30 bg-warning/5">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle className="text-base font-semibold text-warning-foreground">
            Critical Stock Alerts
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/inventory/rolls")}
          className="h-7 gap-1 text-xs text-warning-foreground/75 hover:bg-warning/10 hover:text-warning-foreground"
        >
          View Stock <ArrowRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="space-y-3 px-6 pb-4">
            <Skeleton className="h-4 w-full bg-warning/10" />
            <Skeleton className="h-4 w-full bg-warning/10" />
          </div>
        ) : lowStockItems.length === 0 ? (
          <div className="flex h-20 items-center justify-center text-sm text-warning-foreground/60 px-6 pb-4">
            All stock levels are normal.
          </div>
        ) : (
          <div className="divide-y divide-warning/10 max-h-[220px] overflow-y-auto">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-warning/10"
              >
                <div className="min-w-0">
                  <p className="font-mono text-sm font-semibold text-warning-foreground">
                    {item.materialCode}
                  </p>
                  <p className="text-xs text-warning-foreground/70 truncate">
                    {item.itemName} ({item.materialType})
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-warning-foreground">
                    {item.balanceRolls} rolls
                  </p>
                  <StatusBadge variant={item.status} className="mt-0.5 font-medium text-[10px] py-0 px-1.5" showDot={false}>
                    {item.status === "out-of-stock" ? "Out of Stock" : "Low Stock"}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
