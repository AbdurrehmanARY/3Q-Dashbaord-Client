import * as React from "react";
import { PackageIcon, PlusIcon } from "lucide-react";
import {
  DataTable,
  DataTableEmpty,
  DataTableToolbar,
  type DataTableExportColumn,
} from "@/shared/components/data-table";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { useInventoryStock } from "../hooks/use-inventory";
import { useMaterials, MATERIAL_TYPES } from "@/features/materials";
import { inventoryColumns } from "./inventory-columns";
import { RollStockDialog } from "./RollStockDialog";
import { AppButton } from "@/components/forms/AppButton";
import type { StockLevel } from "../types";

const TYPE_OPTIONS: ComboboxOption<string>[] = MATERIAL_TYPES.map((t) => ({ value: t, label: t }));

const exportColumns: DataTableExportColumn<StockLevel>[] = [
  { header: "Material Code", columnId: "materialCode", value: (s) => s.materialCode },
  { header: "Details", columnId: "details", value: (s) => s.itemName ?? "" },
  { header: "Type", value: (s) => s.materialType ?? "" },
  { header: "Total Received", columnId: "receivedRolls", value: (s) => Number(s.receivedRolls) },
  { header: "Total Issued", columnId: "issuedRolls", value: (s) => Number(s.issuedRolls) },
  { header: "Remaining Rolls", columnId: "balanceRolls", value: (s) => Number(s.balanceRolls) },
  { header: "Status", columnId: "status", value: (s) => s.status ?? "" },
];

/** Composes the generic DataTable with the roll-stock columns. */
export function InventoryStockTable() {
  const [type, setType] = React.useState<string | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);

  const query = type ? { type } : undefined;
  const stock = useInventoryStock(query);
  const materials = useMaterials();

  const rows = React.useMemo<StockLevel[]>(() => {
    const materialByCode = new Map((materials.data ?? []).map((m) => [m.code, m]));
    return (stock.data ?? []).map((roll) => {
      const mat = materialByCode.get(roll.materialCode);
      const balance = Number(roll.balanceRolls) || 0;
      const status: "in-stock" | "low-stock" | "out-of-stock" =
        balance <= 0 ? "out-of-stock" : balance < 5 ? "low-stock" : "in-stock";
      return {
        ...roll,
        itemName: mat?.description ?? "Unknown Roll",
        materialType: mat?.type ?? "—",
        status,
      };
    });
  }, [stock.data, materials.data]);

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={inventoryColumns}
        data={rows}
        loading={stock.isLoading || materials.isLoading}
        getRowId={(row) => row.id}
        enableColumnPinning
        enableRowSelection
        showColumnToggle
        exportColumns={exportColumns}
        exportFilename="roll-stock"
        empty={
          <DataTableEmpty
            icon={<PackageIcon />}
            title="No stock levels found"
            description="Nothing matches the current filter or search."
          />
        }
        toolbar={(table) => (
          <DataTableToolbar table={table} searchPlaceholder="Search by code or name…">
            <AppButton
              size="sm"
              leftIcon={<PlusIcon className="h-4 w-4" />}
              onClick={() => setCreateOpen(true)}
            >
              New Ledger
            </AppButton>
            <div className="sm:w-56">
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

      {createOpen && <RollStockDialog open stock={null} onClose={() => setCreateOpen(false)} />}
    </div>
  );
}
