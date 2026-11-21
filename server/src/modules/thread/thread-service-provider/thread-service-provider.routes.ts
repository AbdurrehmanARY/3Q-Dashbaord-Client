import { Router } from "express";
import { threadServiceProviderController } from "./thread-service-provider.controller";
import { validateRequest, validateParams } from "@shared/middleware/validateRequest";
import {
  createThreadServiceProviderSchema,
  updateThreadServiceProviderSchema,
} from "./thread-service-provider.schema";
import { idParamsSchema } from "@shared/validation/common.schema";
import { requireRole } from "@shared/middleware/rbac";

const router = Router();

router.use(requireRole("production_manager", "ceo"));

router.get("/", threadServiceProviderController.getAll);
router.post("/", validateRequest(createThreadServiceProviderSchema), threadServiceProviderController.create);
router.put(
  "/:id",
  validateParams(idParamsSchema),
  validateRequest(updateThreadServiceProviderSchema),
  threadServiceProviderController.update
);
router.delete("/:id", validateParams(idParamsSchema), threadServiceProviderController.remove);

export default router;
