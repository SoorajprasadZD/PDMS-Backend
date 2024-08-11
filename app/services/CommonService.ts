import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { faceUtil } from "app/common/utils/FaceUtil";

const mimetypes = require("mime-types");

export class CommonService {
  async registerFace(
    face: string,
    descriptor: any
  ): Promise<{
    initVector: string;
    faceDescriptor: string;
    path: string;
  }> {
    const mime = face.split(";")[0].split(":")[1];
    const ext = mimetypes.extension(mime);
    const path = "uploads/" + uuidv4() + "." + ext;

    fs.writeFile(path, face.split(",")[1], "base64", (e) => {
      if (e) {
        console.log(e);
        throw "Unable to save file.";
      }
    });

    const iv = faceUtil.getInitializationVector(16);
    const initVector: any = Buffer.from(iv).toString("base64");
    const faceDescriptor = faceUtil.encryptBiometrics(descriptor, iv);

    return { initVector, faceDescriptor, path };
  }
}

export const commonService = new CommonService();
