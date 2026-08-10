import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/feedback/StatusBadge";
import { DataTableColumnHeader } from "@/shared/components/data-table";
import { formatDate, formatNumber } from "@/lib/format";
import {
  WORK_ORDER_STATUS_META,
  WORK_ORDER_PRIORITY_META,
  WORK_ORDER_TYPE_META,
  type WorkOrder,
} from "../types";
import { WorkOrderRowActions } from "./work-order-row-actions";

/**
 * Column definitions only — no state, no data fetching, no side effects. Everything here
 * is a pure description of how a `WorkOrder` renders, which is what lets the same
 * definitions be reused by any table instance.
 *
 * Sorting is deliberately disabled on the identity/text columns (SO, PO, Design Code,
 * Company, Brand, Status) — they are searched/filtered, not sorted. Pin and Hide stay
 * available on every column.
 */
export const workOrderColumns: ColumnDef<WorkOrder>[] = [
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
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Design Code" />,
    cell: ({ row }) =>
      row.original.designCode ? (
        <span className="font-mono text-xs">{row.original.designCode}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
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
    cell: ({ row }) => {
      const meta = WORK_ORDER_TYPE_META[row.original.orderType] ?? WORK_ORDER_TYPE_META["normal order"];
      return <span className="text-sm">{meta.label}</span>;
    },
    filterFn: (row, id, value) => !value || row.getValue(id) === value,
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
    // Artwork thumbnail sits at the end (just before the actions column) so the identity
    // columns stay first; it links to the full image and shows "—" when none is attached.
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
      <WorkOrderRowActions
        workOrder={row.original}
        pinControls={{
          isPinned: row.getIsPinned(),
          pinTop: () => row.pin("top"),
          pinBottom: () => row.pin("bottom"),
          unpin: () => row.pin(false),
        }}
      />
    ),
  },
];
