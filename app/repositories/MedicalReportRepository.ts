import { IMedicalReport, MedicalReport } from "app/models/MedicalReport";

export class MedicalReportRepository {
  async findAll(): Promise<IMedicalReport[]> {
    const medicalReports = await MedicalReport.find(
      {},
      {
        createdAt: false,
        updatedAt: false,
        __v: false,
        _id: false,
      }
    ).lean();

    return medicalReports;
  }

  async findByPatientId(patientId: string): Promise<IMedicalReport[] | null> {
    const medicalReports = await MedicalReport.find({ patientId });

    return medicalReports;
  }

  async create(payload: IMedicalReport): Promise<any> {
    const medicalReport = await MedicalReport.create(payload);

    return medicalReport;
  }
}
