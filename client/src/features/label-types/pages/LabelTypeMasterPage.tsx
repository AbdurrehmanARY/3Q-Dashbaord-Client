import { useState } from "react";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { LabelTypeTable } from "../components/LabelTypeTable";
import { CreateLabelTypeDialog } from "../components/CreateLabelTypeDialog";
import { useLabelType } from "../hooks/use-label-types";
import type { LabelType } from "../types";

export function LabelTypeMasterPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { data: editingData } = useLabelType(editingId ?? 0);

  const editing: LabelType | null = editingId ? (editingData ?? { id: editingId, name: "", category: "woven", isActive: true, createdAt: "", updatedAt: "" }) : null;

  const handleCreateOpen = () => {
    setEditingId(null);
    setCreateOpen(true);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setCreateOpen(true);
  };

  const handleDialogClose = () => {
    setCreateOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Label Types"
        description="Manage woven and printed label type configurations."
        actions={
          <AppButton
            onClick={handleCreateOpen}
            className="shadow-brand-sm"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            New Label Type
          </AppButton>
        }
      />

      {/* Search, status/category filters, sorting, pagination and row actions all
        live inside the table composition — see LabelTypeTable.tsx. */}
      <LabelTypeTable onCreateNew={handleCreateOpen} onEdit={handleEdit} />

      {createOpen && (
        <CreateLabelTypeDialog
          open={createOpen}
          onOpenChange={handleDialogClose}
          editing={editing}
        />
      )}
    </div>
  );
}