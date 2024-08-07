import type { Request, RequestHandler, Response } from "express";
import { ResponseHelper } from "app/common/utils/ResponseHelper";

import { patientService } from "app/services/PatientService";
import { IPatient } from "app/models/Patient";
import { PasswordUtil } from "app/common/utils/PasswordUtil";
import { Role } from "app/common/enums";

class PatientController {
  public login: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      const existingPatient = await patientService.findByEmail(email);

      if (!existingPatient) {
        return ResponseHelper.handleError(res, "Account does not exist");
      }

      const isAuth = await PasswordUtil.verifyPassword(
        password,
        existingPatient.password
      );

      if (!isAuth) {
        return ResponseHelper.handleError(res, "Invalid credentials");
      }

      return ResponseHelper.handleSuccess(res, "Logged in successfully", {
        patientId: existingPatient.patientId,
        role: Role.PATIENT,
      });
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };

  public getPatients: RequestHandler = async (req: Request, res: Response) => {
    try {
      const patients = await patientService.getAllPatients();

      if (patients.length === 0) {
        return ResponseHelper.handleError(res, "Failed to fetch");
      }

      return ResponseHelper.handleSuccess(
        res,
        "Patients fetched successfully",
        patients
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };

  public createPatient: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload: IPatient = req.body;
      const { id: doctorId } = res.locals;
      const existingPatient = await patientService.findByEmail(payload.email);

      if (existingPatient) {
        return ResponseHelper.handleError(
          res,
          "Account already exists for this email id"
        );
      }

      payload.password = await PasswordUtil.hashPassword(payload.password);
      const result = await patientService.createPatient(payload, doctorId);

      return ResponseHelper.handleSuccess(
        res,
        "Patient created successfully",
        result
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to create patient");
    }
  };
}

export const patientController = new PatientController();
