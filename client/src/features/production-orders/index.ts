/** Public API of the production-orders feature (`@/features/production-orders`). */
export {
  useProductionOrders,
  useProductionOrderDetail,
  useProductionOrderOverview,
} from "./hooks/use-production-orders";
export { useWovenOverview } from "./hooks/use-woven-production";
export { ProductionSummary } from "./components/ProductionSummary";
export { BatchStageBoard } from "./components/BatchStageBoard";
export { StageProgressBars } from "./components/StageProgressBars";
export { useOrderFlow, useLineBatches } from "./hooks/use-batches";
export { UnifiedPlanningDialog } from "./components/PlanLabelTypeDialog";
export type { ProductionOrder, ProductionOrderOverview } from "./types";
export type { ProductionBatch, BatchStage, LineFlow, OrderFlow } from "./batch-types";
export type { WovenLineOverview, WovenOverview } from "./woven-types";

