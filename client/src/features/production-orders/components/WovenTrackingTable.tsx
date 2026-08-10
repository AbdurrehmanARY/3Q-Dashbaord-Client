import { LayersIcon } from "lucide-react";
import { DataTable, DataTableEmpty } from "@/shared/components/data-table";
import { wovenColumns } from "./woven-columns";
import type { WovenLineOverview } from "../woven-types";

interface WovenTrackingTableProps {
  lines: WovenLineOverview[];
  loading?: boolean;
}

/**
 * Read-only woven tracking summary: a compact per-line view of planned vs. woven vs. cut vs. packaged pcs.
 */
export function WovenTrackingTable({ lines, loading }: WovenTrackingTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <DataTable
        columns={wovenColumns}
        data={lines}
        loading={loading}
        pagination={true}
        getRowId={(row) => String(row.id)}
        empty={
          <DataTableEmpty
            icon={<LayersIcon />}
            title="Nothing to track yet"
            description="Plan a woven line on this production order to start recording progress."
          />
        }
      />
    </div>
  );
}
