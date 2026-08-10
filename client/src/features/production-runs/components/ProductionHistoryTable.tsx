import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, DataTableEmpty } from "@/shared/components/data-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { formatNumber, formatDate } from "@/lib/format";
import { RUN_REASON_LABELS, type ProductionRun } from "../types";

const columns: ColumnDef<ProductionRun>[] = [
  {
    accessorKey: "producedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Produced At" />,
    cell: ({ row }) => formatDate(row.original.producedAt),
  },
  {
    accessorKey: "productId",
    header: "Product",
    cell: ({ row }) => row.original.productId ?? "—",
  },
  {
    accessorKey: "machineName",
    header: "Machine",
    cell: ({ row }) => row.original.machineName ?? "—",
  },
  {
    accessorKey: "operatorName",
    header: "Operator",
    cell: ({ row }) => row.original.operatorName ?? "—",
  },
  {
    accessorKey: "runReason",
    header: "Reason",
    cell: ({ row }) => (
      <StatusBadge variant={row.original.runReason === "initial" ? "completed" : "active"}>
        {RUN_REASON_LABELS[row.original.runReason]}
      </StatusBadge>
    ),
  },
  {
    id: "quantityProduced",
    accessorFn: (r) => r.quantityProduced,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => formatNumber(row.original.quantityProduced, 0),
    meta: { align: "right" },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => row.original.notes ?? "—",
  },
];

/** Append-only audit trail — every production pass, newest first. */
export function ProductionHistoryTable({ runs }: { runs: ProductionRun[] }) {
  return (
    <DataTable
      columns={columns}
      data={runs}
      getRowId={(r) => r.id}
      pagination={true}
      empty={
        <DataTableEmpty
          title="No production runs yet"
          description="Log the first production pass to start the history."
        />
      }
    />
  );
}
