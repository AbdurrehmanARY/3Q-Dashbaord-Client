import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import { ProductionOrderStatusBadge } from "./ProductionStatusBadge";
import { ProductionOrderRowActions } from "./production-order-row-actions";
import type { ProductionOrder } from "../types";

/** Column definitions only — no state, no data fetching. See work-order-columns.tsx for the pattern. */
export const productionOrderColumns: ColumnDef<ProductionOrder>[] = [
  {
    accessorKey: "productionNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Production No." />,
    cell: ({ row }) => (
      <div>
        <span className="font-mono font-medium">{row.original.productionNumber}</span>
        <p className="text-xs text-muted-foreground">SO {row.original.soNumber}</p>
      </div>
    ),
  },
  {
    id: "customer",
    accessorFn: (o) => o.companyName ?? "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer / Brand" />,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.companyName ?? "—"}</p>
        <p className="text-xs text-muted-foreground">{row.original.brandName ?? "—"}</p>
      </div>
    ),
  },
  {
    accessorKey: "totalQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Qty" />,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>
    ),
    meta: { align: "right" },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Date" />,
    cell: ({ row }) => formatDate(row.original.orderDate),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
    cell: ({ row }) => formatDate(row.original.dueDate),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <ProductionOrderStatusBadge status={row.original.status} />,
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <ProductionOrderRowActions order={row.original} />,
  },
];
