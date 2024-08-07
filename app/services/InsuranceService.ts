import { IInsurance } from "app/models/Insurance";
import { InsuranceRepository } from "app/repositories/InsuranceRepository";

export class InsuranceService {
  private insuranceRepository: InsuranceRepository;

  constructor(repository: InsuranceRepository = new InsuranceRepository()) {
    this.insuranceRepository = repository;
  }

  async getAllInsurances(): Promise<IInsurance[]> {
    const insurances = await this.insuranceRepository.findAll();

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

  async verify(insuranceCompanyId: string) {
    return this.insuranceRepository.verify(insuranceCompanyId);
  }
}

export const insuranceService = new InsuranceService();
