import { validateRequest } from "app/common/middleware/validator";
import { adminController } from "app/controllers/ AdminController";
import { adminLoginSchema } from "app/schemas/adminSchema";
import express, { type Router } from "express";

const adminRouter: Router = express.Router();

adminRouter.post("/", adminController.createAdmin);
adminRouter.post("/sign-in", validateRequest(adminLoginSchema), adminController.login)

export default adminRouter;
