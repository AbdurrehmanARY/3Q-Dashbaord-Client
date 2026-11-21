import { Router } from "express";
import { companyController } from "./company.controller";
import { validateRequest, validateQuery, validateParams } from "@shared/middleware/validateRequest";
import { createCompanySchema, updateCompanySchema } from "./company.schema";
import { listCompaniesQuerySchema } from "@shared/validation/query.schema";
import { idParamsSchema } from "@shared/validation/common.schema";
import { requireRole } from "@shared/middleware/rbac";

const router = Router();

router.use(requireRole("production_manager", "ceo"));

router.get("/", validateQuery(listCompaniesQuerySchema), companyController.getCompanies);
router.get("/:id", validateParams(idParamsSchema), companyController.getCompany);
router.post("/", validateRequest(createCompanySchema), companyController.createCompany);
router.put("/:id", validateParams(idParamsSchema), validateRequest(updateCompanySchema), companyController.updateCompany);
router.delete("/:id", validateParams(idParamsSchema), companyController.deleteCompany);

export default router;
