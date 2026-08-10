import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Factory,
  Boxes,
  Package,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Plus,
  TrendingUp,
} from "lucide-react";
import { useDashboardKpis } from "../hooks/use-dashboard";
import { useWorkOrderTrend } from "../hooks/use-dashboard-trends";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { Button } from "@/components/ui/button";
import { ProductionTrendChart } from "../components/ProductionTrendChart";
import { RecentWorkOrders } from "../components/RecentWorkOrders";
import { LowStockAlert } from "../components/LowStockAlert";
import { WorkOrderDialog } from "@/features/work-orders";

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: kpis, isLoading: loading, error } = useDashboardKpis();
  // The only KPI with an honestly-derivable trend — see the hook for why the rest don't get one.
  const workOrderTrend = useWorkOrderTrend();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Overview of manufacturing operations, inventory levels, and production logs."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/production-orders")}>
              View Production
            </Button>
            <Button size="sm" onClick={() => setCreateOpen(true)} className="gap-1 shadow-brand-sm">
              <Plus className="h-4 w-4" /> New Work Order
            </Button>
          </div>
        }
      />

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive animate-shake">
          {error instanceof Error ? error.message : "Something went wrong"}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Work Orders"
          value={kpis?.totalWorkOrders ?? 0}
          description={`${kpis?.submittedWorkOrders ?? 0} submitted to production`}
          icon={FileText}
          iconColor="bg-blue-500/10 text-blue-500"
          loading={loading}
          onClick={() => navigate("/work-orders")}
          trend={workOrderTrend?.pct}
          trendLabel={workOrderTrend ? `vs prior ${workOrderTrend.periodDays} days` : undefined}
        />
        <StatCard
          title="Active Production"
          value={kpis?.activeProductionOrders ?? 0}
          description="Runs currently in progress"
          icon={Factory}
          iconColor="bg-indigo-500/10 text-indigo-500"
          loading={loading}
          onClick={() => navigate("/production-orders")}
        />
        <StatCard
          title="Materials Stock"
          value={kpis?.totalMaterials ?? 0}
          description={`${kpis?.lowStockCount ?? 0} items low in stock`}
          icon={Boxes}
          iconColor={kpis?.lowStockCount && kpis.lowStockCount > 0 ? "bg-warning/15 text-warning" : "bg-emerald-500/10 text-emerald-500"}
          loading={loading}
          onClick={() => navigate("/materials")}
        />
        <StatCard
          title="Balance Rolls"
          value={kpis?.totalBalanceRolls ?? 0}
          description="Rolls remaining in inventory"
          icon={Package}
          iconColor="bg-amber-500/10 text-amber-500"
          loading={loading}
          onClick={() => navigate("/inventory/rolls")}
        />
        <StatCard
          title="Issued Rolls"
          value={kpis?.totalIssuedRolls ?? 0}
          description="Total rolls issued to production"
          icon={Package}
          iconColor="bg-violet-500/10 text-violet-500"
          loading={loading}
          onClick={() => navigate("/production-orders")}
        />
        <StatCard
          title="Completed Production"
          value={kpis?.completedProductionOrders ?? 0}
          description="Successfully completed runs"
          icon={CheckCircle2}
          iconColor="bg-emerald-500/10 text-emerald-500"
          loading={loading}
          onClick={() => navigate("/production-orders")}
        />
      </div>

      {/* Main Charts & Lists Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart (spans 2 columns on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <ProductionTrendChart />
          <RecentWorkOrders />
        </div>

        {/* Alerts & Action column */}
        <div className="space-y-6">
          <LowStockAlert />

          {/* Quick Actions Panel */}
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-semibold text-foreground text-sm">Quick Actions</h3>
            <p className="text-xs text-muted-foreground mt-0.5 mb-4">Commonly performed operations</p>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start text-xs h-9" onClick={() => navigate("/purchases/rolls")}>
                Record Purchase Invoice
              </Button>
              <Button variant="outline" className="justify-start text-xs h-9" onClick={() => navigate("/production-orders")}>
                Manage Production
              </Button>
              <Button variant="outline" className="justify-start text-xs h-9" onClick={() => navigate("/companies")}>
                Register Company / Brand
              </Button>
              <Button variant="outline" className="justify-start text-xs h-9" onClick={() => navigate("/inventory/rolls")}>
                View Inventory Stock
              </Button>
            </div>
          </div>
        </div>
      </div>

      {createOpen && (
        <WorkOrderDialog open workOrder={null} onClose={() => setCreateOpen(false)} />
      )}
    </div>
  );
}
