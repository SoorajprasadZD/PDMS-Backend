import { Role } from "app/common/enums";
import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

export interface IDoctor extends Document {
  doctorId: string;
  name: string;
  email: string;
  password: string;
  address: string;
  state: string;
  phone: string;
  faceVerified: boolean;
  phoneVerified: boolean;
  role: string;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    doctorId: {
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
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    faceVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: Role.DOCTOR,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);
