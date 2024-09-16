import { Role } from "app/common/enums";
import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IFaceData extends Document {
  id: string;
  initVector: string;
  faceDescriptor: string;
  path: string;
}

const FaceDataSchema = new Schema<IFaceData>(
  {
    id: {
      type: String,
      required: true,
    },
    initVector: {
      type: String,
      required: true,
    },
    faceDescriptor: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const FaceData = mongoose.model<IFaceData>("FaceData", FaceDataSchema);
