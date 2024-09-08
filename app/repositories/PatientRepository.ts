import { Authorizations } from "app/models/Authorizations";
import { Patient, IPatient } from "app/models/Patient";

export class PatientRepository {
  async findAll(): Promise<IPatient[]> {
    const patients = await Patient.find(
      {},
      {
        password: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        _id: false,
      }
    ).lean();

    return patients;
  }
  async findByIDs(patientIds: string[]): Promise<IPatient[]> {
    const patients = await Patient.find(
      {
        patientId: { $in: patientIds },
      },
      {
        password: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        _id: false,
      }
    ).lean();

    return patients;
  }

  async findById(patientId: string): Promise<IPatient | null> {
    const patient = await Patient.findOne({ patientId });

    return patient;
  }

  async findByEmail(email: string): Promise<IPatient | null> {
    const patient = await Patient.findOne({ email });

    return patient;
  }

  async create(payload: IPatient, doctorId: string): Promise<any> {
    const { patientId, name, email, gender, dob, address, state, phone, role } =
      await Patient.create(payload);

    await Authorizations.create({
      patientId,
      authorizedDoctors: [doctorId],
      authorizedInsurances: [],
    });

    return { patientId, name, email, gender, dob, address, state, phone, role };
  }

  async setFaceRegisteredTrue(patientId: string) {
    await Patient.updateOne(
      {
        patientId,
      },
      {
        faceVerified: true,
      }
    );
  }
}
