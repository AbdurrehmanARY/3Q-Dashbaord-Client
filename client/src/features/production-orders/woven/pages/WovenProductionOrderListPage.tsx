import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { CreateProductionOrderDialog } from "../../components/CreateProductionOrderDialog";
import { WovenProductionOrderTable } from "../components/WovenProductionOrderTable";

interface WovenProductionOrderListPageProps {
  /** When true, hides create button and disables edit/delete — used by read-only dashboard pages. */
  readOnly?: boolean;
}

export function WovenProductionOrderListPage({ readOnly = false }: WovenProductionOrderListPageProps) {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Woven Production Orders"
        description="Production orders running the woven labels workflow (Planning → Weaving → Cutting → Packaging → Dispatch)."
        actions={
          readOnly ? null : (
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
              New Production Order
            </AppButton>
          )
        }
      />

      <WovenProductionOrderTable onCreateNew={() => setCreateOpen(true)} readOnly={readOnly} />

      {!readOnly && (
        <CreateProductionOrderDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          productTypeFilter="woven"
          onCreated={(id) => navigate(`/dashboard/production-orders/woven/${id}/plan`)}
        />
      )}
    </div>
  );
}
