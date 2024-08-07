import { Admin, IAdmin } from "app/models/Admin";

export class AdminRepository {
  async findById(adminId: string): Promise<IAdmin | null> {
    const admin = await Admin.findOne({ adminId });

    return admin;
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    const admin = await Admin.findOne({ email });

    return admin;
  }

  async create(payload: IAdmin): Promise<any> {
    const { adminId, email, role } = await Admin.create(payload);

    return { adminId, email, role };
  }
}
