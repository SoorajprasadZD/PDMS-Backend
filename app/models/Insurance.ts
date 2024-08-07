import { Role } from "app/common/enums";
import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

export interface IInsurance extends Document {
  insuranceCompanyId: string;
  name: string;
  email: string;
  password: string;
  address: string;
  state: string;
  phone: string;
  verified: boolean;
  role: string;
}

const InsuranceSchema = new Schema<IInsurance>(
  {
    insuranceCompanyId: {
      type: String,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: Role.INSURANCE,
    },
  },
  { timestamps: true }
);

export const Insurance = mongoose.model<IInsurance>(
  "Insurance",
  InsuranceSchema
);
