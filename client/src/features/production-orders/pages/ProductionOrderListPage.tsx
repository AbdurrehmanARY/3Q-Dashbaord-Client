import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { CreateProductionOrderDialog } from "../components/CreateProductionOrderDialog";
import { ProductionOrderTable } from "../components/production-order-table";

export function ProductionOrderListPage() {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Production Orders"
        description="Raise production orders from work orders and track them through printing, cutting and packaging."
        actions={
          <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
            New Production Order
          </AppButton>
        }
      />

      <ProductionOrderTable />

      <CreateProductionOrderDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={(id) => navigate(`/production-orders/${id}/plan`)}
      />
    </div>
  );
}
