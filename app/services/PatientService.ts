import { IDoctor } from "app/models/Doctor";
import { IInsurance } from "app/models/Insurance";
import { IMedicalReport } from "app/models/MedicalReport";
import { IPatient } from "app/models/Patient";
import { AuthorizationRepository } from "app/repositories/AuthorizationRepository";
import { DoctorRepository } from "app/repositories/DoctorRepository";
import { InsuranceRepository } from "app/repositories/InsuranceRepository";
import { MedicalReportRepository } from "app/repositories/MedicalReportRepository";
import { PatientRepository } from "app/repositories/PatientRepository";
import { AuthorizeDoctorPayload, AuthorizeInsurancePayload } from "app/types";

export class PatientService {
  private patientRepository: PatientRepository;
  private doctorRepository: DoctorRepository;
  private authorizationRepository: AuthorizationRepository;
  private insuranceRepository: InsuranceRepository;
  private medicalReportRepository: MedicalReportRepository;

  constructor(
    repository: PatientRepository = new PatientRepository(),
    doctorRepository: DoctorRepository = new DoctorRepository(),
    authorizationRepository: AuthorizationRepository = new AuthorizationRepository(),
    insuranceRepository: InsuranceRepository = new InsuranceRepository(),
    medicalReportRepository: MedicalReportRepository = new MedicalReportRepository()
  ) {
    this.insuranceRepository = insuranceRepository;

    this.patientRepository = repository;
    this.doctorRepository = doctorRepository;
    this.authorizationRepository = authorizationRepository;
    this.authorizationRepository = authorizationRepository;
    this.medicalReportRepository = medicalReportRepository;
  }

  async getAllPatients(): Promise<IPatient[]> {
    const patients = await this.patientRepository.findAll();

    return patients;
  }
  async getUnauthorizedDoctorsForPatientByID(
    patientId: string
  ): Promise<IDoctor[]> {
    const authorization =
      await this.authorizationRepository.findAuthorizationByPatientId(
        patientId
      );
    const doctorIds = authorization?.authorizedDoctors;
    const doctors = await this.doctorRepository.findAllExcludingIds(doctorIds);

    return doctors;
  }
  async getUnauthorizedInsuranceForPatientByID(
    patientId: string
  ): Promise<IInsurance[]> {
    const authorization =
      await this.authorizationRepository.findAuthorizationByPatientId(
        patientId
      );
    const insuranceIds = authorization?.authorizedInsurances;
    console.log(insuranceIds);
    const doctors = await this.insuranceRepository.findAllExcludingIds(
      insuranceIds
    );

    return doctors;
  }

  async findById(patientId: string): Promise<IPatient | null> {
    const patient = await this.patientRepository.findById(patientId);

    return patient;
  }

  async findByEmail(email: string): Promise<IPatient | null> {
    const patient = await this.patientRepository.findByEmail(email);

    return patient;
  }

  async createPatient(payload: IPatient, doctorId: string): Promise<any> {
    return this.patientRepository.create(payload, doctorId);
  }

  async verify(patientId: string) {
    return this.patientRepository.verify(patientId);
  }

  async authorizeDoctor(payload: AuthorizeDoctorPayload) {
    return this.authorizationRepository.authorizeDoctor(
      payload.patientId,
      payload.doctorIdToBeAuthorized
    );
  }

  async authorizeInsurance(payload: AuthorizeInsurancePayload) {
    return this.authorizationRepository.authorizeInsurance(
      payload.patientId,
      payload.insuranceCompanyIdToBeAuthorized
    );
  }

  async getAuthorizedDoctors(patientId: string) {
    const [authorization, doctors] = await Promise.all([
      this.authorizationRepository.findAuthorizationByPatientId(patientId),
      this.doctorRepository.findAll(),
    ]);

    if (!authorization) {
      return [];
    }

    return doctors.filter((doc) =>
      authorization.authorizedDoctors.find((e) => e === doc.doctorId)
    );
  }

  async getAuthorizedInsurances(patientId: string) {
    const [authorization, insurances] = await Promise.all([
      this.authorizationRepository.findAuthorizationByPatientId(patientId),
      this.insuranceRepository.findAll(),
    ]);

    if (!authorization) {
      return [];
    }

    return insurances.filter((ins) =>
      authorization.authorizedInsurances.find(
        (e) => e === ins.insuranceCompanyId
      )
    );
  }

  async createMedicalReport(payload: IMedicalReport): Promise<any> {
    return this.medicalReportRepository.create(payload);
  }

  async getMedicalReports(patientId: string): Promise<IMedicalReport[] | null> {
    return this.medicalReportRepository.findByPatientId(patientId);
  }
}

export const patientService = new PatientService();
