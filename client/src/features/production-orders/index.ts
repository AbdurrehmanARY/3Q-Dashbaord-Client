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
export {
  useOrderFlow,
  useLineBatches,
  useOrderBatches,
  useStageBatches,
  useStageSources,
  useStageScopedResources,
  useOrderBatchSources,
  useOrderStageResources,
} from "./hooks/use-batches";
export {
  batchScopeOf,
  isOrderScopedStage,
  isLineScopedStage,
  isOrderScopedOnEveryWorkflow,
  batchCreateTarget,
} from "./utils/batch-scope";
export type { BatchScope, BatchCreateTarget } from "./utils/batch-scope";
export { UnifiedPlanningDialog } from "./components/PlanLabelTypeDialog";
export type { ProductionOrder, ProductionOrderOverview } from "./types";
export type {
  ProductionBatch,
  BatchStage,
  BatchLabelMix,
  LineFlow,
  OrderFlow,
} from "./batch-types";
export type { WovenLineOverview, WovenOverview } from "./woven-types";

