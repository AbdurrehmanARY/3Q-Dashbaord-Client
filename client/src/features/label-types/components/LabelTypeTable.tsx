import * as React from "react";
import { Tag, Plus } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { useLabelTypes } from "../hooks/use-label-types";
import { labelTypeColumns } from "./label-type-columns";

const CATEGORY_OPTIONS: ComboboxOption<string>[] = [
  { value: "woven", label: "Woven" },
  { value: "printed", label: "Printed" },
];

interface LabelTypeTableProps {
  onCreateNew: () => void;
  onEdit?: (id: number) => void;
}

export function LabelTypeTable({ onCreateNew, onEdit }: LabelTypeTableProps) {
  const [category, setCategory] = React.useState<string | null>(null);
  const [activeOnly, setActiveOnly] = React.useState<boolean>(true);
  const { data, isLoading } = useLabelTypes(
    category === "woven" || category === "printed" ? (category as "woven" | "printed") : undefined,
    activeOnly
  );

  const showEmpty = () => {
    if ((data ?? []).length === 0 && !category && activeOnly) {
      return (
        <DataTableEmpty
          icon={<Tag />}
          title="No label types yet"
          description="Create your first label type to get started."
        >
          <AppButton size="sm" onClick={onCreateNew}>
            <Plus className="h-4 w-4" />
            Create Label Type
          </AppButton>
        </DataTableEmpty>
      );
    } else if ((data ?? []).length === 0) {
      return (
        <DataTableEmpty
          icon={<Tag />}
          title="No matching label types"
          description="Nothing matches the current filter or search."
        >
          {category && (
            <AppButton size="sm" variant="outline" onClick={() => {
              setCategory(null);
              setActiveOnly(true);
            }}>
              Clear Filters
            </AppButton>
          )}
        </DataTableEmpty>
      );
    }
    return null;
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={labelTypeColumns(onEdit)}
        data={data ?? []}
        loading={isLoading}
        getRowId={(row) => String(row.id)}
        empty={showEmpty()}
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search by name...">
            <div className="sm:w-40">
              <Combobox
                options={CATEGORY_OPTIONS}
                value={category}
                onChange={setCategory}
                placeholder="All categories"
                emptyText="No categories."
                aria-label="Filter by category"
              />
            </div>
            <div className="sm:w-40">
              <Combobox
                options={[{ value: "true", label: "Active Only" }, { value: "false", label: "All" }]}
                value={activeOnly ? "true" : "false"}
                onChange={(value) => setActiveOnly(value === "true")}
                placeholder="Filter by status"
                emptyText="No options."
                aria-label="Filter by status"
              />
            </div>
          </DataTableToolbar>
        )}
      />
    </div>
  );
}