import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import {
  WORK_ORDER_STATUS_META,
  WORK_ORDER_PRIORITY_META,
  WORK_ORDER_TYPE_META,
  type WorkOrderStatus,
  type WorkOrderPriority,
  type WorkOrderType,
  type ProductType,
} from "@/features/work-orders/types";
import { DashboardWorkOrderRowActions } from "./DashboardWorkOrderRowActions";
import type { WorkOrderItem } from "../services/ceo-dashboard-service";

/**
 * Column definitions for the dashboard's combined (printed + woven) work-orders table.
 *
 * Adds a "Product Type" badge column so users can distinguish printed from woven orders
 * at a glance. Row actions are always read-only (View only) — used by the dashboard pages.
 */
export const dashboardWorkOrderColumns: ColumnDef<WorkOrderItem>[] = [
  {
    accessorKey: "soNumber",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="SO Number" />,
    cell: ({ row }) => <span className="font-mono font-medium">{row.original.soNumber}</span>,
  },
  {
    accessorKey: "poNumber",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="PO Number" />,
    cell: ({ row }) => row.original.poNumber ?? "—",
  },
  {
    accessorKey: "productType",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Type" />,
    cell: ({ row }) => {
      const type = row.original.productType as ProductType;
      const label = type === "woven" ? "Woven" : "Printed";
      return (
        <StatusBadge variant={type === "woven" ? "active" : "info"}>
          {label}
        </StatusBadge>
      );
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    id: "companyBrand",
    accessorFn: (wo) => `${wo.companyName ?? ""} ${wo.brandName ?? ""}`,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company / Brand" />,
    cell: ({ row }) => (
      <div className="text-sm leading-tight">
        <div className="font-medium text-foreground">{row.original.companyName ?? "—"}</div>
        <div className="text-xs text-muted-foreground">{row.original.brandName ?? "—"}</div>
      </div>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const meta =
        WORK_ORDER_PRIORITY_META[row.original.priority as WorkOrderPriority] ??
        WORK_ORDER_PRIORITY_META.normal;
      return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    accessorKey: "orderType",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Type" />,
    cell: ({ row }) =>
      WORK_ORDER_TYPE_META[row.original.orderType as WorkOrderType]?.label ?? row.original.orderType,
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Date" />,
    cell: ({ row }) => formatDate(row.original.orderDate),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
    cell: ({ row }) => (row.original.dueDate ? formatDate(row.original.dueDate) : "—"),
  },
  {
    accessorKey: "totalQty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Qty" align="right" />
    ),
    cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.totalQty, 0)}</span>,
    meta: { align: "right" },
  },
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const meta =
        WORK_ORDER_STATUS_META[row.original.status as WorkOrderStatus] ?? {
          label: row.original.status,
          variant: "neutral" as const,
        };
      return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    id: "createdAt",
    accessorFn: (wo) => wo.createdAt,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row }) => <DashboardWorkOrderRowActions workOrder={row.original} />,
  },
];
