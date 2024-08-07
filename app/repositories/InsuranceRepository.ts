import { Insurance, IInsurance } from "app/models/Insurance";

export class InsuranceRepository {
  async findAll(): Promise<IInsurance[]> {
    const insurances = await Insurance.find(
      {},
      {
        password: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        _id: false,
      }
    ).lean();

    return insurances;
  }

  async findById(insuranceCompanyId: string): Promise<IInsurance | null> {
    const insurance = await Insurance.findOne({ insuranceCompanyId });

    return insurance;
  }

  async findByEmail(email: string): Promise<IInsurance | null> {
    const insurance = await Insurance.findOne({ email });

    return insurance;
  }

  async create(payload: IInsurance): Promise<any> {
    const { insuranceCompanyId, name, email, address, state, phone, role } =
      await Insurance.create(payload);

    return { insuranceCompanyId, name, email, address, state, phone, role };
  }

  async verify(insuranceCompanyId: string) {
    await Insurance.updateOne(
      {
        insuranceCompanyId,
      },
      {
        verified: true,
      }
    );
  }
}
