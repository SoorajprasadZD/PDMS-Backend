import { Role } from "app/common/enums";
import mongoose from "mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

export interface IPatient extends Document {
  patientId: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
  address: string;
  state: string;
  phone: string;
  verified: boolean;
  role: string;
}

const patientSchema = new Schema<IPatient>(
  {
    patientId: {
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
    gender: {
      type: String,
      required: true,
    },
    dob: {
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
      default: Role.PATIENT,
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
