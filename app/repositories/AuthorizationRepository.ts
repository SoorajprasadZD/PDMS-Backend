import { Authorizations } from "app/models/Authorizations";

export class AuthorizationRepository {
  //   async findAll(): Promise<IPatient[]> {
  //     const patients = await Patient.find(
  //       {},
  //       {
  //         password: false,
  //         createdAt: false,
  //         updatedAt: false,
  //         __v: false,
  //         _id: false,
  //       }
  //     ).lean();

  //     return patients;
  //   }

  //   async findById(patientId: string): Promise<IPatient | null> {
  //     const patient = await Patient.findOne({ patientId });

  //     return patient;
  //   }

  //   async findByEmail(email: string): Promise<IPatient | null> {
  //     const patient = await Patient.findOne({ email });

  //     return patient;
  //   }

  async authorizeDoctor(patientId: string, doctorId: string) {
    await Authorizations.updateOne(
      {
        patientId,
      },
      { $push: { authorizedDoctors: doctorId } }
    );
  }

  async authorizeInsurance(patientId: string, insuranceCompanyId: string) {
    await Authorizations.updateOne(
      {
        patientId,
      },
      { $push: { authorizedInsurances: insuranceCompanyId } }
    );
  }
}
