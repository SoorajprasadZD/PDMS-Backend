import { IAdmin } from "app/models/Admin";
import { AdminRepository } from "app/repositories/AdminRepository";
import { commonService } from "./CommonService";
import { IFaceData } from "app/models/FaceData";
import { FaceDataRepository } from "app/repositories/FaceDataRepository";

export class AdminService {
  private adminRepository: AdminRepository;
  private faceDataRepository: FaceDataRepository;

  constructor(
    repository: AdminRepository = new AdminRepository(),
    faceDataRepository: FaceDataRepository = new FaceDataRepository()
  ) {
    this.adminRepository = repository;
    this.faceDataRepository = faceDataRepository;
  }

  async findById(adminId: string): Promise<IAdmin | null> {
    const admin = await this.adminRepository.findById(adminId);

    return admin;
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    const admin = await this.adminRepository.findByEmail(email);

    return admin;
  }

  async createAdmin(payload: IAdmin): Promise<any> {
    return this.adminRepository.create(payload);
  }

  async registerFace(id: string, face: string, descriptor: any) {
    const { path, initVector, faceDescriptor } =
      await commonService.registerFace(face, descriptor);

    await this.faceDataRepository.create({
      id,
      path,
      initVector,
      faceDescriptor,
    } as IFaceData);

    return this.adminRepository.setFaceRegisteredTrue(id);
  }
}

export const adminService = new AdminService();
