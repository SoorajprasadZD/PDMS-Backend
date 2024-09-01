import express, { type Router } from "express";
import { doctorController } from "app/controllers/DoctorController";
import { validateRequest } from "app/common/middleware/validator";
import {
  createDoctorSchema,
  doctorLoginSchema,
} from "app/schemas/doctorSchema";
import { roleValidator } from "app/common/middleware/roleValidator";
import { Role } from "app/common/enums";

const doctorRouter: Router = express.Router();

doctorRouter.post(
  "/sign-in",
  validateRequest(doctorLoginSchema),
  doctorController.login
);
doctorRouter.get("/", doctorController.getDoctors);
doctorRouter.get("/authorized-patients", roleValidator(Role.DOCTOR), doctorController.getDoctorAuthorizedPatients);
doctorRouter.post(
  "/",
  roleValidator(Role.ADMIN),
  validateRequest(createDoctorSchema),
  doctorController.createDoctor
);

export default doctorRouter;
