import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { useMaterials } from "@/features/materials";
import { PurchaseForm } from "../components/PurchaseForm";
import { PurchaseTable } from "../components/purchase-table";

export function PurchaseRecordPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { data: materials } = useMaterials();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Records"
        description="Record incoming material purchases and approve them into inventory stock."
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
