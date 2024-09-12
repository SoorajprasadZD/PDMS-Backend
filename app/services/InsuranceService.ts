import { IInsurance } from "app/models/Insurance";
import { IPatient } from "app/models/Patient";
import { AuthorizationRepository } from "app/repositories/AuthorizationRepository";
import { InsuranceRepository } from "app/repositories/InsuranceRepository";
import { PatientRepository } from "app/repositories/PatientRepository";
import { commonService } from "./CommonService";
import { FaceDataRepository } from "app/repositories/FaceDataRepository";
import { IFaceData } from "app/models/FaceData";
import { Role } from "app/common/enums";

export class InsuranceService {
  private insuranceRepository: InsuranceRepository;
  private authorizationRepository: AuthorizationRepository;
  private patientRepository: PatientRepository;
  private faceDataRepository: FaceDataRepository;

  constructor(
    insuranceRepository: InsuranceRepository = new InsuranceRepository(),
    authorizationRepository: AuthorizationRepository = new AuthorizationRepository(),
    patientRepository: PatientRepository = new PatientRepository(),
    faceDataRepository: FaceDataRepository = new FaceDataRepository()
  ) {
    this.insuranceRepository = insuranceRepository;
    this.authorizationRepository = authorizationRepository;
    this.patientRepository = patientRepository;
    this.faceDataRepository = faceDataRepository;
  }

  async getAllInsurances(): Promise<IInsurance[]> {
    let insurances = await this.insuranceRepository.findAll();

    insurances = insurances.map((insurance:any)=>{
      return {
        ...insurance,
        faceRegistrationLink: `/authentication/face-registration?id=${insurance.insuranceCompanyId}&role=${Role.INSURANCE}&email=${insurance.email}`
      }
    })

    return insurances;
  }

  async findById(insuranceCompanyId: string): Promise<IInsurance | null> {
    const insurance = await this.insuranceRepository.findById(
      insuranceCompanyId
    );

    return insurance;
  }

  async findByEmail(email: string): Promise<IInsurance | null> {
    const insurance = await this.insuranceRepository.findByEmail(email);

    return insurance;
  }

  async createInsurance(payload: IInsurance): Promise<any> {
    return this.insuranceRepository.create(payload);
  }

  async getAuthorizedPatients(insuranceCompanyId: string): Promise<IPatient[]> {
    const insurances = await this.insuranceRepository.findAll();
    const authorizedPatients =
      await this.authorizationRepository.getPatientIdsByInsuranceCompanyId(
        insuranceCompanyId
      );

    const patients = await this.patientRepository.findByIDs(
      authorizedPatients.map((patient) => patient.patientId)
    );

    console.log(patients.map((patient) => patient.patientId));
    return patients;
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

    return this.insuranceRepository.setFaceRegisteredTrue(id);
  }


}

export const insuranceService = new InsuranceService();
