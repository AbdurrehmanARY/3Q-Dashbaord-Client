import * as React from "react";
import { CogIcon, PlusIcon } from "lucide-react";
import { AppCard } from "@/components/cards/AppCard";
import { AppButton } from "@/components/forms/AppButton";
import { EmptyContent } from "@/components/ui/empty";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { useMachines } from "../hooks/use-entities";
import { machineColumns } from "./machine-columns";
import { MachineDialog } from "./MachineDialog";
import { MACHINE_TYPES } from "../schemas/entity-schemas";

const TYPE_OPTIONS: ComboboxOption<string>[] = MACHINE_TYPES.map((t) => ({
  value: t,
  label: `${t} Machines`,
}));

export function MachineTable() {
  const [type, setType] = React.useState<string | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const { data, isLoading } = useMachines(type ? { type } : undefined);

  return (
    <AppCard
      title="Machines"
      headerActions={
        <AppButton size="sm" leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
          Add Machine
        </AppButton>
      }
      contentClassName="p-0"
    >
      <DataTable
        columns={machineColumns}
        data={data ?? []}
        loading={isLoading}
        getRowId={(row) => row.id}
        pagination={true}
        empty={
          (data ?? []).length === 0 && !type ? (
            <DataTableEmpty icon={<CogIcon />} title="No machines yet" description="Add the first production machine.">
              <EmptyContent>
                <AppButton size="sm" onClick={() => setCreateOpen(true)}>
                  <PlusIcon className="h-4 w-4" />
                  Add Machine
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          ) : (
            <DataTableEmpty icon={<CogIcon />} title="No matching machines" description="Nothing matches the current filter.">
              <EmptyContent>
                <AppButton variant="outline" size="sm" onClick={() => setType(null)}>
                  Clear Filter
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          )
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search machines…">
            <div className="w-full sm:w-52">
              <Combobox
                options={TYPE_OPTIONS}
                value={type}
                onChange={setType}
                placeholder="Filter by Type (All)"
                emptyText="No machine types."
                aria-label="Filter by machine type"
              />
            </div>
          </DataTableToolbar>
        )}
      />

      {createOpen && <MachineDialog open machine={null} onClose={() => setCreateOpen(false)} />}
    </AppCard>
  );
}
