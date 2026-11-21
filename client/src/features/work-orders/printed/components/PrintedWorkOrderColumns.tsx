import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate } from "@/lib/format";
import {
  WORK_ORDER_STATUS_META,
  WORK_ORDER_PRIORITY_META,
  WORK_ORDER_TYPE_META,
  type WorkOrder,
} from "@/features/work-orders/types";
import { PrintedWorkOrderRowActions } from "./PrintedWorkOrderRowActions";

/**
 * Column definitions for the printed workflow table.
 *
 * These mirror `workOrderColumns` but:
 *  — Omit the "Type" badge column (this page is printed-only).
 *  — Drop the Design Code loom-spec column (only relevant for woven).
 *
 * Sorting is disabled on identity/text columns (SO, PO, Company, Brand, Status)
 * — they are searched/filtered, not sorted. Pin and Hide stay available.
 *
 * Pass `readOnly: true` to render only the View action — used by read-only
 * dashboard pages.
 */
export const printedWorkOrderColumns = (readOnly = false): ColumnDef<WorkOrder>[] => [
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
      const meta = WORK_ORDER_PRIORITY_META[row.original.priority] ?? WORK_ORDER_PRIORITY_META.normal;
      return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
    accessorKey: "orderType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Type" />,
    cell: ({ row }) => WORK_ORDER_TYPE_META[row.original.orderType].label,
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
    cell: ({ row }) => <span className="tabular-nums">{row.original.totalQty}</span>,
    meta: { align: "right" },
  },
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const meta = WORK_ORDER_STATUS_META[row.original.status];
      return <StatusBadge variant={meta.variant}>{meta.label}</StatusBadge>;
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
  },
  {
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
    accessorKey: "fbrInvoiceNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="FBR Invoice #" />,
    cell: ({ row }) =>
      row.original.fbrInvoiceNumber ? (
        <span className="font-mono text-xs">{row.original.fbrInvoiceNumber}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    id: "artwork",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Artwork" />,
    cell: ({ row }) => {
      const url = row.original.imageUrl?.trim();
      if (!url) return <span className="text-muted-foreground">—</span>;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" title="Open artwork">
          <img
            src={url}
            alt={`Artwork ${row.original.soNumber}`}
            className="h-9 w-9 rounded border object-cover"
            loading="lazy"
          />
        </a>
      );
    },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
    size: 56,
    cell: ({ row }) => (
      <PrintedWorkOrderRowActions
        workOrder={row.original}
        readOnly={readOnly}
        pinControls={!readOnly ? {
          isPinned: row.getIsPinned(),
          pinTop: () => row.pin("top"),
          pinBottom: () => row.pin("bottom"),
          unpin: () => row.pin(false),
        } : undefined}
      />
    ),
  },
];
