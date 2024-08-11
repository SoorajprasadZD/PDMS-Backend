import { IDoctor } from "app/models/Doctor";
import { DoctorRepository } from "app/repositories/DoctorRepository";
import { commonService } from "./CommonService";
import { FaceDataRepository } from "app/repositories/FaceDataRepository";
import { IFaceData } from "app/models/FaceData";

export class DoctorService {
  private doctorRepository: DoctorRepository;
  private faceDataRepository: FaceDataRepository;

  constructor(
    doctorRepository: DoctorRepository = new DoctorRepository(),
    faceDataRepository: FaceDataRepository = new FaceDataRepository()
  ) {
    this.doctorRepository = doctorRepository;
    this.faceDataRepository = faceDataRepository;
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

  async verify(id: string, face: string, descriptor: any) {
    const { path, initVector, faceDescriptor } =
      await commonService.registerFace(face, descriptor);

    await this.faceDataRepository.create({
      id,
      path,
      initVector,
      faceDescriptor,
    } as IFaceData);

    return this.doctorRepository.verify(id);
  }
}

export const doctorService = new DoctorService();
