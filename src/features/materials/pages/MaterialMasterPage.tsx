import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { MaterialTable } from "../components/material-table";
import { MaterialForm } from "../components/MaterialForm";

export function MaterialMasterPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Material Master"
        description="Manage bulk roll materials used in production."
        actions={
          <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
            Create Material
          </AppButton>
        }
      />

      <MaterialTable onCreateNew={() => setCreateOpen(true)} />

      {createOpen && <MaterialForm open material={null} onClose={() => setCreateOpen(false)} />}
    </div>
  );
}
