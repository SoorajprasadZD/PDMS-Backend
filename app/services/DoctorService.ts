import { IDoctor } from "app/models/Doctor";
import { DoctorRepository } from "app/repositories/DoctorRepository";

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor(repository: DoctorRepository = new DoctorRepository()) {
    this.doctorRepository = repository;
  }

  async getAllDoctors(): Promise<IDoctor[]> {
    const doctors = await this.doctorRepository.findAll();

    return doctors;
  }

  async findById(doctorId: string): Promise<IDoctor | null> {
    const doctor = await this.doctorRepository.findById(doctorId);

    return doctor;
  }

  async findByEmail(email: string): Promise<IDoctor | null> {
    const doctor = await this.doctorRepository.findByEmail(email);

    return doctor;
  }

  async createDoctor(payload: IDoctor): Promise<any> {
    return this.doctorRepository.create(payload);
  }

  async verify(doctorId: string) {
    return this.doctorRepository.verify(doctorId);
  }
}

export const doctorService = new DoctorService();
