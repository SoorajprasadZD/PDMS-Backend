verifyLinkSchema;

import express, { type Router } from "express";
import { commonController } from "app/controllers/CommonController";
import { validateRequest } from "app/common/middleware/validator";
import { verifyLinkSchema } from "app/schemas/commonSchema";
import { roleValidator } from "app/common/middleware/roleValidator";
import { Role } from "app/common/enums";

const commonRouter: Router = express.Router();

commonRouter.post(
  "/register-face",
  // validateRequest(verifyLinkSchema),
  commonController.registerFace
);
commonRouter.post(
  "/authorize-face",
  (req: any, res: any, next: any)=>{

    console.log(
      "authorize face called",
      req.headers
    )

    next();
  },
  roleValidator(Role.ALL),
  commonController.authorizeFace
);

export default commonRouter;
