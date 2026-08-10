import { PackageIcon } from "lucide-react";
import { DataTable, DataTableEmpty } from "@/shared/components/data-table";
import { rollColumns } from "./roll-columns";
import type { ProductionLineOverview } from "../types";

interface RollTrackingTableProps {
  lines: ProductionLineOverview[];
  loading?: boolean;
}

/**
 * Read-only roll tracking: a compact per-label-type view of planned vs. printed vs.
 * packaged rolls. Editing lives exclusively in the Production Progress table
 * (`EditableLabelTypeTable`) — this table used to also edit Printed Rolls inline, which
 * meant two independent optimistic writers of the same field on one page. That was removed
 * so there is a single source of edits and no chance of the two clobbering each other.
 */
export function RollTrackingTable({ lines, loading }: RollTrackingTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={rollColumns}
        data={lines}
        loading={loading}
        pagination={true}
        getRowId={(row) => String(row.id)}
        empty={
          <DataTableEmpty
            icon={<PackageIcon />}
            title="Nothing to track yet"
            description="Plan a label type on this production order to start recording rolls."
          />
        }
      />
    </div>
  );
}
