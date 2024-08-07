import { IPatient } from "app/models/Patient";
import { PatientRepository } from "app/repositories/PatientRepository";

export class PatientService {
  private patientRepository: PatientRepository;

  constructor(repository: PatientRepository = new PatientRepository()) {
    this.patientRepository = repository;
  }

  async getAllPatients(): Promise<IPatient[]> {
    const patients = await this.patientRepository.findAll();

    return patients;
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
}

export const patientService = new PatientService();
