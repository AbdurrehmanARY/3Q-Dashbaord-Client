import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SegmentedTabs, type SegmentedOption } from "@/shared/components/segmented-tabs";
import { InventoryStockTable } from "../components/inventory-stock-table";
import { ThreadStockPanel } from "@/features/thread";

type StockTab = "rolls" | "thread";

const TABS: SegmentedOption<StockTab>[] = [
  { value: "rolls", label: "Roll Stock" },
  { value: "thread", label: "Thread Stock" },
];

/**
 * One inventory screen covering both product lines: rolls feed the printed workflow, thread
 * feeds the woven one. They are separate ledgers with different units (rolls vs kg) and
 * different rules, so each gets its own view rather than one blended table.
 */
export function InventoryStockPage() {
  const [tab, setTab] = useState<StockTab>("rolls");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Roll stock for printed labels and thread stock for woven labels."
      />

      {/* The stock-type switcher sits directly above the table it controls. */}
      <div className="space-y-4">
        <SegmentedTabs
          options={TABS}
          value={tab}
          onChange={setTab}
          aria-label="Choose which stock to view"
        />

        {tab === "rolls" ? <InventoryStockTable /> : <ThreadStockPanel />}
      </div>
    </div>
  );
}
