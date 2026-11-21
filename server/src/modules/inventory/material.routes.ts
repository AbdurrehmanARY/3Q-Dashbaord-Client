import { Router } from "express";
import { materialController } from "./material.controller";
import { validateRequest, validateQuery, validateParams } from "@shared/middleware/validateRequest";
import { createMaterialSchema, updateMaterialSchema } from "./material.schema";
import { listMaterialsQuerySchema } from "@shared/validation/query.schema";
import { idParamsSchema } from "@shared/validation/common.schema";
import { requireRole } from "@shared/middleware/rbac";

const router = Router();

router.use(requireRole("production_manager", "ceo"));

router.get("/", validateQuery(listMaterialsQuerySchema), materialController.getMaterials);
router.get("/:id", validateParams(idParamsSchema), materialController.getMaterial);
router.post("/", validateRequest(createMaterialSchema), materialController.createMaterial);
router.put("/:id", validateParams(idParamsSchema), validateRequest(updateMaterialSchema), materialController.updateMaterial);
router.delete("/:id", validateParams(idParamsSchema), materialController.deleteMaterial);

export default router;
