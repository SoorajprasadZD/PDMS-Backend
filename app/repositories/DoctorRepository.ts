import { Doctor, IDoctor } from "app/models/Doctor";

export class DoctorRepository {
  async findAll(): Promise<IDoctor[]> {
    const doctors = await Doctor.find(
      {},
      {
        password: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        _id: false,
      }
    ).lean();

    return doctors;
  }

  async findById(doctorId: string): Promise<IDoctor | null> {
    const doctor = await Doctor.findOne({ doctorId });

    return doctor;
  }

  async findByEmail(email: string): Promise<IDoctor | null> {
    const doctor = await Doctor.findOne({ email });

    return doctor;
  }

  async create(payload: IDoctor): Promise<any> {
    const { doctorId, name, email, address, state, phone, role } =
      await Doctor.create(payload);

    return { doctorId, name, email, address, state, phone, role };
  }

  async verify(doctorId: string) {
    await Doctor.updateOne(
      {
        doctorId,
      },
      {
        verified: true,
      }
    );
  }
}
