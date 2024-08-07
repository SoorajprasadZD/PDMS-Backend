import { Role } from "app/common/enums";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

export interface IAdmin extends Document {
  adminId: string;
  email: string;
  password: string;
  role: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    adminId: {
      type: String,
      default: () => uuidv4(),
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
    role: {
      type: String,
      default: Role.ADMIN,
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
