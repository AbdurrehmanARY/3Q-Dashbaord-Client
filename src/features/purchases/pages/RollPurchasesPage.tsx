import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { useMaterials } from "@/features/materials";
import { PurchaseForm } from "../components/PurchaseForm";
import { PurchaseTable } from "../components/purchase-table";

/**
 * Dedicated page for material (roll) stock purchases.
 * Material purchases credit roll stock for printed label manufacturing.
 */
export function RollPurchasesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { data: materials } = useMaterials();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roll Purchases"
        description="Incoming material purchases for printed labels. Roll stock is credited immediately upon purchase."
        actions={
          <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
            New Purchase
          </AppButton>
        }
      />

      <PurchaseTable onCreateNew={() => setCreateOpen(true)} />

      {createOpen && materials && (
        <PurchaseForm open materials={materials} onClose={() => setCreateOpen(false)} />
      )}
    </div>
  );
}
