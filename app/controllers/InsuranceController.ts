import type { Request, RequestHandler, Response } from "express";
import { ResponseHelper } from "app/common/utils/ResponseHelper";

import { insuranceService } from "app/services/InsuranceService";
import { IInsurance } from "app/models/Insurance";
import { PasswordUtil } from "app/common/utils/PasswordUtil";
import { Role } from "app/common/enums";

class InsuranceController {
  public login: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const existingInsurance = await insuranceService.findByEmail(email);

      if (!existingInsurance) {
        return ResponseHelper.handleError(res, "Account does not exist");
      }

      const isAuth = await PasswordUtil.verifyPassword(
        password,
        existingInsurance.password
      );

      if (!isAuth) {
        return ResponseHelper.handleError(res, "Invalid credentials");
      }

      return ResponseHelper.handleSuccess(res, "Logged in successfully", {
        insuranceCompanyId: existingInsurance.insuranceCompanyId,
        role: Role.INSURANCE,
      });

    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };

  public getInsurances: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const insurances = await insuranceService.getAllInsurances();

      if (insurances.length === 0) {
        return ResponseHelper.handleError(res, "Failed to fetch");
      }

      return ResponseHelper.handleSuccess(
        res,
        "Insurances fetched successfully",
        insurances
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };

  public createInsurance: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload: IInsurance = req.body;
      const existingInsurance = await insuranceService.findByEmail(
        payload.email
      );

      if (existingInsurance) {
        return ResponseHelper.handleError(
          res,
          "Account already exists for this email id"
        );
      }

      payload.password = await PasswordUtil.hashPassword(payload.password);
      const result = await insuranceService.createInsurance(payload);

      return ResponseHelper.handleSuccess(
        res,
        "Insurance created successfully",
        result
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to create insurance");
    }
  };

  public getInsuranceAuthorizedPatients: RequestHandler = async (req: Request, res: Response) => {
    try {
      const insuranceCompanyId = res.locals.id;
      const patients = await insuranceService.getAuthorizedPatients(insuranceCompanyId);


      return ResponseHelper.handleSuccess(
        res,
        "insurances authorized patients fetched successfully",
        patients
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };
}

export const insuranceController = new InsuranceController();
