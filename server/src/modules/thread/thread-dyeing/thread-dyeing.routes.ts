import { Router } from "express";
import { threadDyeingController } from "./thread-dyeing.controller";
import { validateRequest, validateParams } from "@shared/middleware/validateRequest";
import {
  createDyeingSendSchema,
  receiveDyeingSchema,
} from "./thread-dyeing.schema";
import { idParamsSchema } from "@shared/validation/common.schema";
import { requireRole } from "@shared/middleware/rbac";

const router = Router();

router.use(requireRole("production_manager", "ceo"));

router.get("/sends", threadDyeingController.listSends);
router.post("/sends", validateRequest(createDyeingSendSchema), threadDyeingController.send);
router.post(
  "/sends/:id/receive",
  validateParams(idParamsSchema),
  validateRequest(receiveDyeingSchema),
  threadDyeingController.receive
);

export default router;
