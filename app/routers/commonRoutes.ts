verifyLinkSchema;

import express, { type Router } from "express";
import { commonController } from "app/controllers/CommonController";
import { validateRequest } from "app/common/middleware/validator";
import { verifyLinkSchema } from "app/schemas/commonSchema";

const commonRouter: Router = express.Router();

commonRouter.post(
  "/register-face",
  // validateRequest(verifyLinkSchema),
  commonController.registerFace
);

export default commonRouter;
