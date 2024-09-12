import type { Request, RequestHandler, Response } from "express";
import { ResponseHelper } from "app/common/utils/ResponseHelper";
import { Role } from "app/common/enums";
import { doctorService } from "app/services/DoctorService";
import { patientService } from "app/services/PatientService";
import { insuranceService } from "app/services/InsuranceService";
import { StatusCodes } from "http-status-codes";
import { commonService } from "app/services/CommonService";
import { adminService } from "app/services/AdminService";

class CommonController {
  public registerFace: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id, role, screenshot, descriptor } = req.body;
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
        case Role.ADMIN:
          user = await adminService.findById(id);
          service = adminService;
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

      if (user.faceVerified) {
        return ResponseHelper.handleError(
          res,
          "Already registered",
          StatusCodes.BAD_REQUEST
        );
      }

      // TODO : ensure that mobile is verified before going to face registration

      service.registerFace(id, screenshot, descriptor);

      return ResponseHelper.handleSuccess(res, "Registered successfully");
    } catch (error) {
      return ResponseHelper.handleError(res, "Registration failed");
    }
  };

  public authorizeFace: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id, role } = res.locals;
      const { screenshot, descriptor } = req.body;
      let user = null;
      let service: any = doctorService;

      console.log(id, role);

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

      const isFaceAuthorized = await commonService.authorizeFace(
        id,
        screenshot,
        descriptor
      );

      if (isFaceAuthorized) {
        return ResponseHelper.handleSuccess(res, "Authorized successfully");
      }

      return ResponseHelper.handleError(res, "Authorization failed");
    } catch (error) {
      console.log(error);
      return ResponseHelper.handleError(res, "Registration failed");
    }
  };
}

export const commonController = new CommonController();
