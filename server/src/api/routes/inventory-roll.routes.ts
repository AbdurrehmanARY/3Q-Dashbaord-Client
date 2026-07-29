import { Router } from "express";
import { inventoryRollController } from "@api/controllers/inventory-roll.controller";
import { validateRequest } from "@api/middleware/validateRequest";
import { validateParams } from "@api/middleware/validateRequest";
import { validateQuery } from "@api/middleware/validateRequest";
import { createInventoryRollSchema, updateInventoryRollSchema, inventoryRollParamsSchema } from "@api/validations/inventory-roll.validation";
import { listStockQuerySchema } from "@api/validations/query.validation";

const router = Router();

router.get("/", validateQuery(listStockQuerySchema), inventoryRollController.getInventoryRolls);
router.post("/", validateRequest(createInventoryRollSchema), inventoryRollController.createInventoryRoll);
router.get("/:materialCode", validateParams(inventoryRollParamsSchema), inventoryRollController.getInventoryRollByMaterialCode);
router.put("/:materialCode", validateRequest(updateInventoryRollSchema), inventoryRollController.updateInventoryRoll);
router.delete("/:materialCode", validateParams(inventoryRollParamsSchema), inventoryRollController.deleteInventoryRoll);

export default router;
