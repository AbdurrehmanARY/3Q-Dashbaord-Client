import type { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { AppButton } from "@/components/forms/AppButton";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { formatDateTime, formatNumber } from "@/lib/format";
import type { InkConsumption } from "../types";

export function inkConsumptionColumns(onDelete: (id: number) => void): ColumnDef<InkConsumption>[] {
  return [
    {
      accessorKey: "consumedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="When" />,
      cell: ({ row }) => <span className="text-sm">{formatDateTime(row.original.consumedAt)}</span>,
    },
    {
      accessorKey: "materialCode",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Material Code" />,
      cell: ({ row }) => <span className="font-mono text-sm font-semibold">{row.original.materialCode}</span>,
    },
    {
      accessorKey: "operatorName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Operator" />,
      cell: ({ row }) => <span className="text-sm">{row.original.operatorName ?? "—"}</span>,
    },
    {
      accessorKey: "qtyAssigned",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Qty" />,
      cell: ({ row }) => <span className="text-sm tabular-nums">{formatNumber(Number(row.original.qtyAssigned), 2)}</span>,
      meta: { align: "right" },
    },
    {
      accessorKey: "weight",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Weight (kg)" />,
      cell: ({ row }) => <span className="font-medium tabular-nums">{formatNumber(Number(row.original.weight), 3)}</span>,
      meta: { align: "right" },
    },
    {
      accessorKey: "note",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Note" />,
      cell: ({ row }) => (
        <span className="block max-w-[220px] truncate text-sm text-muted-foreground">{row.original.note ?? "—"}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
      size: 56,
      cell: ({ row }) => (
        <ConfirmDialog
          trigger={
            <AppButton variant="ghost" size="icon" aria-label="Delete">
              <Trash2Icon className="size-4 text-destructive" />
            </AppButton>
          }
          title="Delete consumption entry?"
          description="This credits the weight back to stock. This cannot be undone."
          confirmLabel="Delete"
          onConfirm={() => onDelete(row.original.id)}
        />
      ),
    },
  ];
}
