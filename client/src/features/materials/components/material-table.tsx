import * as React from "react";
import { BoxesIcon, PlusIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { EmptyContent } from "@/components/ui/empty";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { useMaterials } from "../hooks/use-materials";
import { materialColumns } from "./material-columns";
import { MATERIAL_TYPES } from "../schemas/material-schemas";

const TYPE_OPTIONS: ComboboxOption<string>[] = MATERIAL_TYPES.map((t) => ({ value: t, label: t }));

interface MaterialTableProps {
  /** The create dialog is opened from two places (page header + empty state), so its
   *  open state is owned by the page rather than duplicated here. */
  onCreateNew: () => void;
}

/** Composes the generic DataTable with the material column definitions. */
export function MaterialTable({ onCreateNew }: MaterialTableProps) {
  const [type, setType] = React.useState<string | null>(null);
  const { data, isLoading } = useMaterials(type ?? undefined);

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={materialColumns}
        data={data ?? []}
        loading={isLoading}
        getRowId={(row) => row.id}
        empty={
          (data ?? []).length === 0 && !type ? (
            <DataTableEmpty icon={<BoxesIcon />} title="No materials yet" description="Create the first bulk roll material.">
              <EmptyContent>
                <AppButton size="sm" onClick={onCreateNew}>
                  <PlusIcon className="h-4 w-4" />
                  Create Material
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          ) : (
            <DataTableEmpty icon={<BoxesIcon />} title="No matching materials" description="Nothing matches the current filter or search.">
              {type && (
                <EmptyContent>
                  <AppButton variant="outline" size="sm" onClick={() => setType(null)}>
                    Clear Filter
                  </AppButton>
                </EmptyContent>
              )}
            </DataTableEmpty>
          )
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search by code or description…">
            <div className="sm:w-52">
              <Combobox
                options={TYPE_OPTIONS}
                value={type}
                onChange={setType}
                placeholder="All types"
                emptyText="No types."
                aria-label="Filter by material type"
              />
            </div>
          </DataTableToolbar>
        )}
      />
    </div>
  );
}
