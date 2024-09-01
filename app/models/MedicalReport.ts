import { Role } from "app/common/enums";
import mongoose from "mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

export interface IMedicalReport extends Document {
  medicalReportId: string;
  patientId: string;
  causeOfVisit: string;
  condition: string;
  dateOfVisit: string;
  description: string;
  doctor: string;
  medication: string;
}

const medicalReportSchema = new Schema<IMedicalReport>(
  {
    medicalReportId: {
      type: String,
      default: () => uuidv4(),
    },
    patientId: {
      type: String,
      required: true,
    },
    causeOfVisit: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    dateOfVisit: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    medication: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const MedicalReport = mongoose.model<IMedicalReport>(
  "MedicalReport",
  medicalReportSchema
);
