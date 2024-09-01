import type { Request, RequestHandler, Response } from "express";
import { ResponseHelper } from "app/common/utils/ResponseHelper";
import PDFDocument from "pdfkit";
import { patientService } from "app/services/PatientService";
import { IPatient } from "app/models/Patient";
import { PasswordUtil } from "app/common/utils/PasswordUtil";
import { Role } from "app/common/enums";
import { AuthorizeDoctorPayload, AuthorizeInsurancePayload } from "app/types";
import { doctorService } from "app/services/DoctorService";
import { insuranceService } from "app/services/InsuranceService";
import { StatusCodes } from "http-status-codes";

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
  public getUnauthorizedDoctors: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const patientId = req.params.patientId;
      const unauthorizedDoctors =
        await patientService.getUnauthorizedDoctorsForPatientByID(patientId);
      return ResponseHelper.handleSuccess(
        res,
        "Unauthorized doctors fetched successfully",
        unauthorizedDoctors
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };
  public getUnauthorizedInsurance: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const patientId = req.params.patientId;
      const unauthorizedInsurances = await patientService.getUnauthorizedInsuranceForPatientByID(patientId);
      return ResponseHelper.handleSuccess(
        res,
        "Unauthorized Insurance fetched successfully",
        unauthorizedInsurances
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

  public authorizeDoctor: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload: AuthorizeDoctorPayload = req.body;
      const { id: doctorId } = res.locals;
      const existingPatient = await patientService.findById(payload.patientId);
      const existingDoctor = await doctorService.findById(doctorId);
      const doctorToBeAuthorized = await doctorService.findById(
        payload.doctorIdToBeAuthorized
      );

      // TODO: check if doctor has permission

      if (!existingPatient || !existingDoctor || !doctorToBeAuthorized) {
        return ResponseHelper.handleError(
          res,
          "Invalid request. Doctor or patient does not exist"
        );
      }

      const result = await patientService.authorizeDoctor(payload);

      return ResponseHelper.handleSuccess(
        res,
        "Doctor authorized successfully",
        result
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to authorize doctor");
    }
  };

  public authorizeInsurance: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload: AuthorizeInsurancePayload = req.body;
      const { id: doctorId } = res.locals;
      const existingPatient = await patientService.findById(payload.patientId);
      const existingDoctor = await doctorService.findById(doctorId);
      const insuranceToBeAuthorized = await insuranceService.findById(
        payload.insuranceCompanyIdToBeAuthorized
      );

      // TODO: check if doctor has permission

      if (!existingPatient || !existingDoctor || !insuranceToBeAuthorized) {
        return ResponseHelper.handleError(
          res,
          "Invalid request. Insurance or patient does not exist"
        );
      }

      const result = await patientService.authorizeInsurance(payload);

      return ResponseHelper.handleSuccess(
        res,
        "Insurance authorized successfully",
        result
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to authorize insurance");
    }
  };

  public generateMedicalReport = async (req: Request, res: Response) => {
    const doc = new PDFDocument();
    generateMedicalReport(req.body, doc);
    res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "attachment; filename=medical-report.pdf");

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Finalize the PDF document
    doc.end();
  };

  public fetchProfile: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.params;
      const existingPatient = await patientService.findById(patientId);

      if (!existingPatient) {
        return ResponseHelper.handleError(
          res,
          "Invalid request. Patient does not exist",
          StatusCodes.BAD_REQUEST
        );
      }

      const data = {
        patientId: existingPatient.patientId,
        fullName: existingPatient.name,
        mobile: existingPatient.phone,
        email: existingPatient.email,
        gender: existingPatient.gender,
        dob: existingPatient.gender,
        address: existingPatient.address,
        state: existingPatient.state,
      };

      return ResponseHelper.handleSuccess(
        res,
        "Insurance authorized successfully",
        data
      );
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch patient profile");
    }
  };
}

export const patientController = new PatientController();
