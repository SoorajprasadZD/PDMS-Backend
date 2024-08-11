import express, { type Request, type Response, type Router } from "express";
import { ServiceResponse } from "app/common/models/serviceResponse";
import { ResponseHelper } from "app/common/utils/ResponseHelper";
import { commonService } from "app/services/CommonService";
import fs from "fs";

const healthCheckRouter: Router = express.Router();

healthCheckRouter.post("/", (_req: Request, res: Response) => {
  const imageBuffer = fs.readFileSync("app/common/uploads/1.jpeg");

  console.log(_req)

  const { screenshot, descriptor } = _req.body;

  const base64Image = imageBuffer.toString("base64");
  const mimeType = "image/jpeg"; // Replace with actual MIME type if known
  const faceImage = `data:${mimeType};base64,${base64Image}`;

  commonService.registerFace(screenshot, descriptor);
  ResponseHelper.handleSuccess(res, "healthy", {});
});

export default healthCheckRouter;
