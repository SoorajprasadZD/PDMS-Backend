import { Doctor, IDoctor } from "app/models/Doctor";
import { FaceData, IFaceData } from "app/models/FaceData";

export class FaceDataRepository {
  //   async findAll(): Promise<IDoctor[]> {
  //     const doctors = await Doctor.find(
  //       {},
  //       {
  //         password: false,
  //         createdAt: false,
  //         updatedAt: false,
  //         __v: false,
  //         _id: false,
  //       }
  //     ).lean();

  //     return doctors;
  //   }

  //   async findById(doctorId: string): Promise<IDoctor | null> {
  //     const doctor = await Doctor.findOne({ doctorId });

  //     return doctor;
  //   }

  //   async findByEmail(email: string): Promise<IDoctor | null> {
  //     const doctor = await Doctor.findOne({ email });

  //     return doctor;
  //   }

  async create(payload: IFaceData): Promise<IFaceData> {
    return FaceData.create(payload);
  }

  async findByUserId(id: string): Promise<IFaceData | null> {
    return FaceData.findOne({
      id,
    });
  }
}
