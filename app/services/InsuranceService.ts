import { IInsurance } from "app/models/Insurance";
import { IPatient } from "app/models/Patient";
import { AuthorizationRepository } from "app/repositories/AuthorizationRepository";
import { InsuranceRepository } from "app/repositories/InsuranceRepository";
import { PatientRepository } from "app/repositories/PatientRepository";

export class InsuranceService {
  private insuranceRepository: InsuranceRepository;
  private authorizationRepository: AuthorizationRepository;
  private patientRepository: PatientRepository;

  constructor(
    insuranceRepository: InsuranceRepository = new InsuranceRepository(),
    authorizationRepository: AuthorizationRepository = new AuthorizationRepository(),
    patientRepository: PatientRepository = new PatientRepository()
  ) {
    this.insuranceRepository = insuranceRepository;
    this.authorizationRepository = authorizationRepository;
    this.patientRepository = patientRepository;
  }

  async getAllInsurances(): Promise<IInsurance[]> {
    const insurances = await this.insuranceRepository.findAll();

    return insurances;
  }

  async findById(insuranceCompanyId: string): Promise<IInsurance | null> {
    const insurance = await this.insuranceRepository.findById(
      insuranceCompanyId
    );

    return insurance;
  }

  async findByEmail(email: string): Promise<IInsurance | null> {
    const insurance = await this.insuranceRepository.findByEmail(email);

    return insurance;
  }

  async createInsurance(payload: IInsurance): Promise<any> {
    return this.insuranceRepository.create(payload);
  }

  async verify(insuranceCompanyId: string) {
    return this.insuranceRepository.verify(insuranceCompanyId);
  }

  async getAuthorizedPatients(insuranceCompanyId: string): Promise<IPatient[]> {
    const insurances = await this.insuranceRepository.findAll();
    const authorizedPatients =
      await this.authorizationRepository.getPatientIdsByInsuranceCompanyId(
        insuranceCompanyId
      );

    const patients = await this.patientRepository.findByIDs(
      authorizedPatients.map((patient) => patient.patientId)
    );

    console.log(patients.map((patient) => patient.patientId));
    return patients;
  }
}

export const insuranceService = new InsuranceService();
