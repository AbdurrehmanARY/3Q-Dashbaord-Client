import { useState } from "react";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkOrderTable } from "../components/work-order-table";
import { WorkOrderDialog } from "../components/WorkOrderDialog";

export function WorkOrderListPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Work Orders"
        description="Sales orders for both product lines — printed and woven labels."
        actions={
          <AppButton
            onClick={() => setCreateOpen(true)}
            className="shadow-brand-sm"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            New Work Order
          </AppButton>
        }
      />

      {/* Search, status/company/due-date filters, sorting, pagination and row actions all
          live inside the table composition — see work-order-table.tsx. */}
      <WorkOrderTable onCreateNew={() => setCreateOpen(true)} />

      {createOpen && (
        <WorkOrderDialog open workOrder={null} onClose={() => setCreateOpen(false)} />
      )}
    </div>
  );
}
