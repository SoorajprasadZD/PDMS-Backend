import express, { type Request, type Response, type Router } from "express";
import { ServiceResponse } from "app/common/models/serviceResponse";
import { ResponseHelper } from "app/common/utils/ResponseHelper";

const healthCheckRouter: Router = express.Router();

healthCheckRouter.get("/", (_req: Request, res: Response) => {
  ResponseHelper.handleSuccess(res, "healthy", {});
});

export default healthCheckRouter;
