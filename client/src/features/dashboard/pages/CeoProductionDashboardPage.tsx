import { useLocation, useNavigate } from "react-router-dom";
import { PrintedProductionOrderListPage } from "@/features/production-orders/printed/pages/PrintedProductionOrderListPage";
import { WovenProductionOrderListPage } from "@/features/production-orders/woven/pages/WovenProductionOrderListPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Factory } from "lucide-react";

/**
 * CEO Dashboard for Production Orders - with tabs to switch between Printed and Woven.
 * Reads the current URL to determine active tab and renders the appropriate list.
 * Each tab has its own URL so refresh/deep-links preserve the selection.
 */
export function CeoProductionDashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isWoven = location.pathname.includes("/woven");

  const handleTabChange = (value: string) => {
    const newPath =
      value === "woven"
        ? "/dashboard/ceo/production/woven"
        : "/dashboard/ceo/production/printed";
    navigate(newPath);
  };

  return (
    <div className="space-y-4">
      <Tabs
        value={isWoven ? "woven" : "printed"}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="printed">
            <FileText className="mr-2 h-4 w-4" />
            Printed Production
          </TabsTrigger>
          <TabsTrigger value="woven">
            <Factory className="mr-2 h-4 w-4" />
            Woven Production
          </TabsTrigger>
        </TabsList>

        <TabsContent value="printed" className="mt-4">
          <PrintedProductionOrderListPage readOnly />
        </TabsContent>
        <TabsContent value="woven" className="mt-4">
          <WovenProductionOrderListPage readOnly />
        </TabsContent>
      </Tabs>
    </div>
  );
}