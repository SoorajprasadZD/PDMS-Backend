import express, { type Router } from "express";
import { insuranceController } from "app/controllers/InsuranceController";
import { validateRequest } from "app/common/middleware/validator";
import {
  createInsuranceSchema,
  insuranceLoginSchema,
} from "app/schemas/insuranceSchema";
import { roleValidator } from "app/common/middleware/roleValidator";
import { Role } from "app/common/enums";

const insuranceRouter: Router = express.Router();

insuranceRouter.post(
  "/sign-in",
  validateRequest(insuranceLoginSchema),
  insuranceController.login
);
insuranceRouter.get("/", insuranceController.getInsurances);
insuranceRouter.post(
  "/",
  roleValidator(Role.ADMIN),
  validateRequest(createInsuranceSchema),
  insuranceController.createInsurance
);

export default insuranceRouter;
