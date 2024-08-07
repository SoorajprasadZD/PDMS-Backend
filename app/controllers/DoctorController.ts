import type { Request, RequestHandler, Response } from "express";
import { ResponseHelper } from "app/common/utils/ResponseHelper";

import { doctorService } from "app/services/DoctorService";
import { IDoctor } from "app/models/Doctor";
import { PasswordUtil } from "app/common/utils/PasswordUtil";
import { Role } from "app/common/enums";

class DoctorController {
  public login: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const existingDoctor = await doctorService.findByEmail(email);

      if (!existingDoctor) {
        return ResponseHelper.handleError(res, "Account does not exist");
      }

      const isAuth = await PasswordUtil.verifyPassword(
        password,
        existingDoctor.password
      );

      if (!isAuth) {
        return ResponseHelper.handleError(res, "Invalid credentials");
      }

      return ResponseHelper.handleSuccess(res, "Logged in successfully", {
        doctorId: existingDoctor.doctorId,
        role: Role.DOCTOR,
      });
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };

  public getDoctors: RequestHandler = async (req: Request, res: Response) => {
    try {
      const doctors = await doctorService.getAllDoctors();

      if (doctors.length === 0) {
        return ResponseHelper.handleError(res, "Failed to fetch");
      }

      return ResponseHelper.handleSuccess(
        res,
        "Doctors fetched successfully",
        doctors
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };

  public createDoctor: RequestHandler = async (req: Request, res: Response) => {
    try {
      const payload: IDoctor = req.body;
      const existingDoctor = await doctorService.findByEmail(payload.email);

      if (existingDoctor) {
        return ResponseHelper.handleError(
          res,
          "Account already exists for this email id"
        );
      }

      payload.password = await PasswordUtil.hashPassword(payload.password);
      const result = await doctorService.createDoctor(payload);

      return ResponseHelper.handleSuccess(
        res,
        "Doctor created successfully",
        result
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to create doctor");
    }
  };
}

export const doctorController = new DoctorController();
