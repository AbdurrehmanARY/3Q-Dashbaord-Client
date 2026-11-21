import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { CreateProductionOrderDialog } from "../../components/CreateProductionOrderDialog";
import { PrintedProductionOrderTable } from "../components/PrintedProductionOrderTable";

interface PrintedProductionOrderListPageProps {
  /** When true, hides create button and disables edit/delete — used by read-only dashboard pages. */
  readOnly?: boolean;
}

export function PrintedProductionOrderListPage({ readOnly = false }: PrintedProductionOrderListPageProps) {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Printed Production Orders"
        description="Production orders running the printed labels workflow (Planning → Printing → Cutting → Packaging → Dispatch)."
        actions={
          readOnly ? null : (
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
              New Production Order
            </AppButton>
          )
        }
      />

      <PrintedProductionOrderTable onCreateNew={() => setCreateOpen(true)} readOnly={readOnly} />

      {!readOnly && (
        <CreateProductionOrderDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          productTypeFilter="printed"
          onCreated={(id) => navigate(`/dashboard/production-orders/printed/${id}/plan`)}
        />
      )}
    </div>
  );
}
