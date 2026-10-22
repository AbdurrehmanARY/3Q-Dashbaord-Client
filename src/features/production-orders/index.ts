/** Public API of the production-orders feature (`@/features/production-orders`). */
export {
  useProductionOrders,
  useProductionOrderDetail,
  useProductionOrderOverview,
  useCompletionReport,
} from "./hooks/use-production-orders";
export { useWovenOverview } from "./hooks/use-woven-production";
export { ProductionSummary } from "./components/ProductionSummary";
export { ProductionCompletionReport } from "./components/ProductionCompletionReport";
export { BatchStageBoard } from "./components/BatchStageBoard";
export { StageProgressBars } from "./components/StageProgressBars";
export {
  useOrderFlow,
  useLineBatches,
  useBatchSources,
  useStageResources,
} from "./hooks/use-batches";
export { UnifiedPlanningDialog } from "./components/PlanLabelTypeDialog";
export type { ProductionOrder, ProductionOrderOverview, CompletionReport } from "./types";
export type {
  ProductionBatch,
  BatchStage,
  LineFlow,
  OrderFlow,
} from "./batch-types";
export type { WovenLineOverview, WovenOverview } from "./woven-types";

