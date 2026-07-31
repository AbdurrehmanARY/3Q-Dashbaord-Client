import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryStockTable } from "../components/inventory-stock-table";
import { ThreadStockPanel } from "@/features/thread";

/**
 * One inventory screen covering both product lines: rolls feed the printed workflow, thread
 * feeds the woven one. They are separate ledgers with different units (rolls vs kg) and
 * different rules, so each gets its own tab rather than one blended table.
 *
 * The switcher sits at the very top — which stock you're looking at is the first decision,
 * and it changes the header and the entire body below it.
 */
export function InventoryStockPage() {
  const [tab, setTab] = useState("rolls");
  const isRolls = tab === "rolls";

  return (
    <Tabs value={tab} onValueChange={setTab} className="space-y-4">
      <TabsList className="w-full sm:w-auto">
        <TabsTrigger value="rolls" className="flex-1 sm:flex-none">
          Roll Stock
        </TabsTrigger>
        <TabsTrigger value="thread" className="flex-1 sm:flex-none">
          Thread Stock
        </TabsTrigger>
      </TabsList>

      <PageHeader
        title={isRolls ? "Roll Stock" : "Thread Stock"}
        description={
          isRolls
            ? "Bulk roll stock for printed labels. Per SKU Balance is Remaining Rolls × Roll Per KG."
            : "Thread for woven labels, split into undyed (primary) and dyed (secondary) pools."
        }
      />

      <TabsContent value="rolls">
        <InventoryStockTable />
      </TabsContent>

      <TabsContent value="thread">
        <ThreadStockPanel />
      </TabsContent>
    </Tabs>
  );
}
