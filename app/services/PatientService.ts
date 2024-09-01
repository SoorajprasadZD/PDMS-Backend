import { IDoctor } from "app/models/Doctor";
import { IPatient } from "app/models/Patient";
import { AuthorizationRepository } from "app/repositories/AuthorizationRepository";
import { DoctorRepository } from "app/repositories/DoctorRepository";
import { PatientRepository } from "app/repositories/PatientRepository";
import { AuthorizeDoctorPayload, AuthorizeInsurancePayload } from "app/types";

export class PatientService {
  private patientRepository: PatientRepository;
  private doctorRepository: DoctorRepository;
  private authorizationRepository: AuthorizationRepository;

  constructor(
    repository: PatientRepository = new PatientRepository(),
    doctorRepository: DoctorRepository = new DoctorRepository(),
    authorizationRepository: AuthorizationRepository = new AuthorizationRepository()
  ) {
    this.patientRepository = repository;
    this.doctorRepository = doctorRepository;
    this.authorizationRepository = authorizationRepository;
  }

  async getAllPatients(): Promise<IPatient[]> {
    const patients = await this.patientRepository.findAll();

    return patients;
  }
  async getUnauthorizedDoctorsForPatientByID(
    patientId: string
  ): Promise<IDoctor[]> {
    const authorization = await this.authorizationRepository.findAuthorizationByPatientId(
      patientId
    );
    const doctorIds = authorization?.authorizedDoctors;
    const doctors = await this.doctorRepository.findAllExcludingIds(doctorIds);

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
}

export const patientService = new PatientService();
