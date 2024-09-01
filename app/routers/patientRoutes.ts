import express, { type Router } from "express";
import { patientController } from "app/controllers/PatientController";
import { validateRequest } from "app/common/middleware/validator";
import {
  authorizeDoctorSchema,
  authorizeInsuranceSchema,
  createMedicalReportSchema,
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
patientRouter.get(
  "/:patientId/unauthorized-doctors",
  roleValidator(Role.DOCTOR),
  patientController.getUnauthorizedDoctors
);
patientRouter.get(
  "/:patientId/unauthorized-insurances",
  roleValidator(Role.DOCTOR),
  patientController.getUnauthorizedInsurance
);

patientRouter.get("/", patientController.getPatients);
patientRouter.post(
  "/",
  roleValidator(Role.DOCTOR),
  validateRequest(createPatientSchema),
  patientController.createPatient
);
patientRouter.post(
  "/authorize-doctor",
  roleValidator(Role.DOCTOR),
  validateRequest(authorizeDoctorSchema),
  patientController.authorizeDoctor
);
patientRouter.post(
  "/authorize-insurance",
  roleValidator(Role.DOCTOR),
  validateRequest(authorizeInsuranceSchema),
  patientController.authorizeInsurance
);
patientRouter.get("/:patientId/profile", patientController.fetchProfile);
patientRouter.get(
  "/:patientId/authorized-doctors",
  patientController.getAuthorizedDoctors
);
patientRouter.get(
  "/:patientId/authorized-insurances",
  patientController.getAuthorizedInsurances
);
patientRouter.post(
  "/:patientId/report",
  roleValidator(Role.DOCTOR),
  validateRequest(createMedicalReportSchema),
  patientController.createMedicalReport
);
patientRouter.get("/:patientId/report", patientController.fetchMedicalReports);
patientRouter.post(
  "/generate-report-pdf",
  patientController.generateMedicalReportPdf
);

export default patientRouter;
