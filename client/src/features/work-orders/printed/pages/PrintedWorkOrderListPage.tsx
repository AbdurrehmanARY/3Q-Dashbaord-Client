import { useState } from "react";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrintedWorkOrderTable } from "../components/PrintedWorkOrderTable";
import { PrintedWorkOrderDialog } from "../components/PrintedWorkOrderDialog";

interface PrintedWorkOrderListPageProps {
  /** When true, hides create button and disables edit/delete — used by read-only dashboard pages. */
  readOnly?: boolean;
}

export function PrintedWorkOrderListPage({ readOnly = false }: PrintedWorkOrderListPageProps) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Printed Work Orders"
        description="Sales orders for the printed labels workflow (Printing → Cutting → Packaging)."
        actions={
          readOnly ? null : (
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
              New Printed Order
            </AppButton>
          )
        }
      />

      <PrintedWorkOrderTable onCreateNew={() => setCreateOpen(true)} readOnly={readOnly} />

      {!readOnly && createOpen && <PrintedWorkOrderDialog open onClose={() => setCreateOpen(false)} />}
    </div>
  );
}
