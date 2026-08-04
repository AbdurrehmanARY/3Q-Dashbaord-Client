import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import { WORK_ORDER_STATUS_META, type WorkOrder } from "../types";
import { WorkOrderRowActions } from "./work-order-row-actions";

/**
 * Column definitions only — no state, no data fetching, no side effects. Everything here
 * is a pure description of how a `WorkOrder` renders, which is what lets the same
 * definitions be reused by any table instance.
 */
export const workOrderColumns: ColumnDef<WorkOrder>[] = [
  {
    accessorKey: "soNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SO Number" />,
    cell: ({ row }) => <span className="font-mono font-medium">{row.original.soNumber}</span>,
  },
  {
    accessorKey: "poNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PO Number" />,
    cell: ({ row }) => row.original.poNumber ?? "—",
  },
  {
    // Both workflows share this one list — the badge is how you tell them apart at a glance.
    accessorKey: "productType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.original.productType ?? "printed";
      return (
        <StatusBadge variant={type === "woven" ? "active" : "pending"}>
          {type === "woven" ? "Woven" : "Printed"}
        </StatusBadge>
      );
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    id: "designCode",
    accessorFn: (wo) => wo.designCode ?? "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Design Code" />,
    cell: ({ row }) =>
      row.original.designCode ? (
        <span className="font-mono text-xs">{row.original.designCode}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company" />,
    cell: ({ row }) => row.original.companyName ?? "—",
  },
  {
    accessorKey: "brandName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" />,
    cell: ({ row }) => row.original.brandName ?? "—",
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
    accessorKey: "totalQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Qty" />,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const meta = WORK_ORDER_STATUS_META[row.original.status];
      return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
    },
    // Exact match: the status filter is a picker, not a search box.
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    // Dispatch paperwork — searchable via the toolbar's global filter.
    id: "dispatch",
    accessorFn: (wo) => [wo.dcNumber, wo.lcNumber].filter(Boolean).join(" "),
    header: ({ column }) => <DataTableColumnHeader column={column} title="DC / LC" />,
    cell: ({ row }) => {
      const { dcNumber, lcNumber } = row.original;
      if (!dcNumber && !lcNumber) return <span className="text-muted-foreground">—</span>;
      return (
        <div className="text-xs leading-tight">
          <div className="font-mono">{dcNumber ?? "—"}</div>
          <div className="font-mono text-muted-foreground">{lcNumber ?? "—"}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <WorkOrderRowActions workOrder={row.original} />,
  },
];
