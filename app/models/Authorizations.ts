import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IAuthorizations extends Document {
  patientId: string;
  authorizedDoctors: string[];
  authorizedInsurances: string[];
}

const AuthorizationsSchema = new Schema<IAuthorizations>(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    authorizedDoctors: {
      type: [String],
      required: true,
    },
    authorizedInsurances: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const Authorizations = mongoose.model<IAuthorizations>(
  "Authorizations",
  AuthorizationsSchema
);
