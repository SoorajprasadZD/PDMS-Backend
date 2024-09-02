verifyLinkSchema;

import express, { type Router } from "express";
import { commonController } from "app/controllers/CommonController";
import { validateRequest } from "app/common/middleware/validator";
import { verifyLinkSchema } from "app/schemas/commonSchema";
import { roleValidator } from "app/common/middleware/roleValidator";

const commonRouter: Router = express.Router();

commonRouter.post(
  "/register-face",
  // validateRequest(verifyLinkSchema),
  commonController.registerFace
);
commonRouter.post(
  "/authorize-face",
  roleValidator(),
  commonController.authorizeFace
);

export default commonRouter;
