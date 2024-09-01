// import { Role } from "app/common/enums";
// import mongoose from "mongoose";
// import { Document } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

// const Schema = mongoose.Schema;

// export interface IMedicalReport extends Document {
//   medicalReportId: string;
//   name: string;
//   email: string;
//   password: string;
//   gender: string;
//   dob: string;
//   address: string;
//   state: string;
//   phone: string;
//   faceVerified: boolean;
//   phoneVerified: boolean;
//   role: string;
// }

// const medicalReportSchema = new Schema<IMedicalReport>(
//   {
//     medicalReportId: {
//       type: String,
//       default: () => uuidv4(),
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//     },
//     dob: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//     },
//     state: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     faceVerified: {
//       type: Boolean,
//       default: false,
//     },
//     phoneVerified: {
//       type: Boolean,
//       default: false,
//     },
//     role: {
//       type: String,
//       default: Role.PATIENT,
//     },
//   },
//   { timestamps: true }
// );

// export const MedicalReport = mongoose.model<IMedicalReport>("MedicalReport", medicalReportSchema);
