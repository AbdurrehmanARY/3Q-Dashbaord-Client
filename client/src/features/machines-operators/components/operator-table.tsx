import * as React from "react";
import { PlusIcon, UsersIcon } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { EmptyContent } from "@/components/ui/empty";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { useOperators } from "../hooks/use-entities";
import { operatorColumns } from "./operator-columns";
import { OperatorDialog } from "./OperatorDialog";
import { DESIGNATIONS } from "../schemas/entity-schemas";

const DESIGNATION_OPTIONS: ComboboxOption<string>[] = DESIGNATIONS.map((d) => ({ value: d, label: d }));

export function OperatorTable() {
  const [designation, setDesignation] = React.useState<string | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const { data, isLoading } = useOperators(designation ? { designation } : undefined);

  return (
    <AppCard
      title="Operators"
      headerActions={
        <AppButton size="sm" leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
          Add Operator
        </AppButton>
      }
      contentClassName="p-0"
    >
      <DataTable
        columns={operatorColumns}
        data={data ?? []}
        loading={isLoading}
        getRowId={(row) => row.id}
        pagination={false}
        empty={
          (data ?? []).length === 0 && !designation ? (
            <DataTableEmpty icon={<UsersIcon />} title="No operators yet" description="Add the first floor operator.">
              <EmptyContent>
                <AppButton size="sm" onClick={() => setCreateOpen(true)}>
                  <PlusIcon className="h-4 w-4" />
                  Add Operator
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          ) : (
            <DataTableEmpty icon={<UsersIcon />} title="No matching operators" description="Nothing matches the current filter.">
              <EmptyContent>
                <AppButton variant="outline" size="sm" onClick={() => setDesignation(null)}>
                  Clear Filter
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          )
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search operators…">
            <div className="sm:w-40">
              <Combobox
                options={DESIGNATION_OPTIONS}
                value={designation}
                onChange={setDesignation}
                placeholder="All designations"
                emptyText="No designations."
                aria-label="Filter by designation"
              />
            </div>
          </DataTableToolbar>
        )}
      />

      {createOpen && <OperatorDialog open operator={null} onClose={() => setCreateOpen(false)} />}
    </AppCard>
  );
}
