import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, type ZodError, type ZodSchema } from "zod";
import { ResponseHelper } from "../utils/ResponseHelper";
import { Role } from "../enums";
import { doctorService } from "app/services/DoctorService";
import { patientService } from "app/services/PatientService";
import { insuranceService } from "app/services/InsuranceService";
import { adminService } from "app/services/AdminService";

export const roleValidator =
  (validRole: Role) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.headers;

      if (!id || !role) {
        return ResponseHelper.handleError(
          res,
          "Missing user ID or role in headers",
          StatusCodes.UNAUTHORIZED
        );
      }

      const headersSchema = z.object({
        id: z.string({ message: "id required" }),
        role: z.enum([validRole]),
      });

      headersSchema.parse(req.headers);

      let service: any;
      switch (role) {
        case Role.DOCTOR:
          service = doctorService;
          break;
        case Role.PATIENT:
          service = patientService;
          break;
        case Role.INSURANCE:
          service = insuranceService;
          break;
        case Role.ADMIN:
          service = adminService;
          break;
        default:
          throw new Error("UnAuthorized");
      }

      const user = await service.findById(id);

      if (!user || !user.role || user.role !== validRole) {
        throw new Error("UnAuthorized");
      }

      res.locals.id = id;

      next();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return ResponseHelper.handleError(
          res,
          "Invalid input",
          {
            errors: (err as ZodError).errors.map((e) => ({
              field: e.path[1],
              message: e.message,
              path: e.path[0],
            })),
          },
          StatusCodes.UNAUTHORIZED
        );
      } else {
        return ResponseHelper.handleError(
          res,
          err.message,
          null,
          StatusCodes.UNAUTHORIZED
        );
      }
    }
  };
