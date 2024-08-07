import express, { type Router } from "express";
import { patientController } from "app/controllers/PatientController";
import { validateRequest } from "app/common/middleware/validator";
import {
  createPatientSchema,
  patientLoginSchema,
} from "app/schemas/patientSchema";
import { roleValidator } from "app/common/middleware/roleValidator";
import { Role } from "app/common/enums";

const patientRouter: Router = express.Router();

patientRouter.post(
  "/login",
  validateRequest(patientLoginSchema),
  patientController.login
);
patientRouter.get("/", patientController.getPatients);
patientRouter.post(
  "/",
  roleValidator(Role.DOCTOR),
  validateRequest(createPatientSchema),
  patientController.createPatient
);

export default patientRouter;
