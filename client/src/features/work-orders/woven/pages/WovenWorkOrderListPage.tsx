import { useState } from "react";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { WovenWorkOrderTable } from "../components/WovenWorkOrderTable";
import { WovenWorkOrderDialog } from "../components/WovenWorkOrderDialog";

interface WovenWorkOrderListPageProps {
  /** When true, hides create button and disables edit/delete — used by read-only dashboard pages. */
  readOnly?: boolean;
}

export function WovenWorkOrderListPage({ readOnly = false }: WovenWorkOrderListPageProps) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Woven Work Orders"
        description="Sales orders for the woven labels workflow (Planning → Weaving → Cutting → Packaging)."
        actions={
          readOnly ? null : (
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
              New Woven Order
            </AppButton>
          )
        }
      />

      <WovenWorkOrderTable onCreateNew={() => setCreateOpen(true)} readOnly={readOnly} />

      {!readOnly && createOpen && <WovenWorkOrderDialog open onClose={() => setCreateOpen(false)} />}
    </div>
  );
}
