import { IAdmin } from "app/models/Admin";
import { AdminRepository } from "app/repositories/AdminRepository";

export class AdminService {
  private adminRepository: AdminRepository;

  constructor(repository: AdminRepository = new AdminRepository()) {
    this.adminRepository = repository;
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
}

export const adminService = new AdminService();
