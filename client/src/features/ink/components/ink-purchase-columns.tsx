import type { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { AppButton } from "@/components/forms/AppButton";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { formatDate, formatNumber } from "@/lib/format";
import type { InkPurchase } from "../types";

interface ColumnCallbacks {
  onEdit: (p: InkPurchase) => void;
  onDelete: (id: number) => void;
}

export function inkPurchaseColumns({ onEdit, onDelete }: ColumnCallbacks): ColumnDef<InkPurchase>[] {
  return [
    {
      accessorKey: "reportDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => <span className="text-sm">{formatDate(row.original.reportDate)}</span>,
    },
    {
      accessorKey: "materialCode",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Material Code" />,
      cell: ({ row }) => <span className="font-mono text-sm font-semibold">{row.original.materialCode}</span>,
    },
    {
      accessorKey: "vendor",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
      cell: ({ row }) => <span className="text-sm">{row.original.vendor}</span>,
    },
    {
      accessorKey: "invoiceNumber",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice #" />,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.invoiceNumber ?? "—"}</span>
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Qty" />,
      cell: ({ row }) => <span className="text-sm tabular-nums">{formatNumber(Number(row.original.quantity), 2)}</span>,
      meta: { align: "right" },
    },
    {
      accessorKey: "weightPerQty",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Wt/Qty (kg)" />,
      cell: ({ row }) => <span className="text-sm tabular-nums">{formatNumber(Number(row.original.weightPerQty), 3)}</span>,
      meta: { align: "right" },
    },
    {
      accessorKey: "totalWeight",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Wt (kg)" />,
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">{formatNumber(Number(row.original.totalWeight), 3)}</span>
      ),
      meta: { align: "right" },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
      size: 88,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <AppButton variant="ghost" size="icon" aria-label="Edit" onClick={() => onEdit(row.original)}>
            <PencilIcon className="size-4" />
          </AppButton>
          <ConfirmDialog
            trigger={
              <AppButton variant="ghost" size="icon" aria-label="Delete">
                <Trash2Icon className="size-4 text-destructive" />
              </AppButton>
            }
            title="Delete ink purchase?"
            description="This reduces the derived stock for its material code. This cannot be undone."
            confirmLabel="Delete"
            onConfirm={() => onDelete(row.original.id)}
          />
        </div>
      ),
    },
  ];
}
