import * as React from "react";
import { PackageIcon } from "lucide-react";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { ComboboxSelect as Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { useInventoryStock, useUpdateInventoryRoll } from "../hooks/use-inventory";
import { useMaterials, MATERIAL_TYPES } from "@/features/materials";
import { inventoryColumns } from "./inventory-columns";
import { RollStockDialog } from "./RollStockDialog";
import { AppButton } from "@/components/forms/AppButton";
import { PlusIcon } from "lucide-react";
import type { StockLevel } from "../types";

const TYPE_OPTIONS: ComboboxOption<string>[] = MATERIAL_TYPES.map((t) => ({ value: t, label: t }));

/**
 * Composes the generic DataTable with the inventory columns. Roll Per KG is the one
 * editable cell in an otherwise read-only table; committing it is optimistic (the cell
 * updates instantly) with a cache rollback if the request fails.
 */
export function InventoryStockTable() {
  const [type, setType] = React.useState<string | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);

  const query = type ? { type } : undefined;
  const stock = useInventoryStock(query);
  const materials = useMaterials();
  const updateRoll = useUpdateInventoryRoll();

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

  // `row.index` is the stable original-data index, so this resolves the edited row even
  // when the table is sorted/filtered.
  const rowsRef = React.useRef(rows);
  rowsRef.current = rows;

  const meta = React.useMemo(
    () => ({
      validateCell: (_rowIndex: number, columnId: string, value: unknown) => {
        if (columnId !== "rollPerKg") return null;
        if (Number(value) < 0) return "Cannot be negative";
        return null;
      },
      // Optimistic update + rollback live in the mutation hook, so committing a cell is a
      // single serialized mutation rather than a hand-rolled cache patch in the component.
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        if (columnId !== "rollPerKg") return;
        const row = rowsRef.current[rowIndex];
        if (!row) return;
        updateRoll.mutate({ materialCode: row.materialCode, rollPerKg: Number(value) });
      },
    }),
    [updateRoll]
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={inventoryColumns}
        data={rows}
        loading={stock.isLoading || materials.isLoading}
        meta={meta}
        getRowId={(row) => row.id}
        // Wide table — keep the material code and Actions columns fixed while scrolling.
        stickyFirstColumn
        stickyLastColumn
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
