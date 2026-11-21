import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "@shared/middleware/validateRequest";
import { registerSchema, loginSchema, refreshSchema } from "./auth.schema";
import { authenticate } from "@shared/middleware/auth";

const router = Router();

router.post("/register", validateRequest(registerSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/refresh", validateRequest(refreshSchema), authController.refresh);

router.get("/me", authenticate, authController.me);

export default router;