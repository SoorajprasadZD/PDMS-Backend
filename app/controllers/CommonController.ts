import type { Request, RequestHandler, Response } from "express";
import { ResponseHelper } from "app/common/utils/ResponseHelper";
import { PasswordUtil } from "app/common/utils/PasswordUtil";
import { IAdmin } from "app/models/Admin";
import { adminService } from "app/services/AdminService";
import { Role } from "app/common/enums";
import { doctorService } from "app/services/DoctorService";
import { patientService } from "app/services/PatientService";
import { insuranceService } from "app/services/InsuranceService";
import { StatusCodes } from "http-status-codes";

class CommonController {
  public verifyLink: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id, role } = req.body;

      let user = null;
      let service: any = doctorService;

      switch (role) {
        case Role.DOCTOR:
          user = await doctorService.findById(id);
          service = doctorService;
          break;
        case Role.PATIENT:
          user = await patientService.findById(id);
          service = patientService;
          break;
        case Role.INSURANCE:
          user = await insuranceService.findById(id);
          service = insuranceService;
          break;
      }

      if (!user) {
        return ResponseHelper.handleError(
          res,
          "User does not exist",
          {
            id,
          },
          StatusCodes.BAD_REQUEST
        );
      }

      if (user.verified) {
        return ResponseHelper.handleError(
          res,
          "Already verified",
          StatusCodes.BAD_REQUEST
        );
      }

      service.verify(id);

      return ResponseHelper.handleSuccess(res, "Verified successfully");
    } catch (error) {
      return ResponseHelper.handleError(res, "Verification failed");
    }
  };
}

export const commonController = new CommonController();
