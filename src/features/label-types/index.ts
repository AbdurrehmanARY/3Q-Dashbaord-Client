export {
  useLabelTypes,
  useLabelType,
  useCreateLabelType,
  useUpdateLabelType,
  useDeleteLabelType,
  LABEL_TYPE_KEYS,
} from "./hooks/use-label-types";
export { labelTypeService } from "./services/label-type-service";
export type { LabelType, CreateLabelTypeInput, UpdateLabelTypeInput } from "./types";