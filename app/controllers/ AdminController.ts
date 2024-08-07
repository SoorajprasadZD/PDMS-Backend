import type { Request, RequestHandler, Response } from "express";
import { ResponseHelper } from "app/common/utils/ResponseHelper";
import { PasswordUtil } from "app/common/utils/PasswordUtil";
import { IAdmin } from "app/models/Admin";
import { adminService } from "app/services/AdminService";
import { Role } from "app/common/enums";

class AdminController {
  public login: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const existingAdmin = await adminService.findByEmail(email);

      if (!existingAdmin) {
        return ResponseHelper.handleError(res, "Account does not exist");
      }

      const isAuth = await PasswordUtil.verifyPassword(
        password,
        existingAdmin.password
      );

      if (!isAuth) {
        return ResponseHelper.handleError(res, "Invalid credentials");
      }

      return ResponseHelper.handleSuccess(res, "Logged in successfully", {
        adminId: existingAdmin.adminId,
        role: Role.ADMIN,
      });
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to fetch");
    }
  };

  public createAdmin: RequestHandler = async (req: Request, res: Response) => {
    try {
      const payload: IAdmin = {
        email: "admin@gmail.com",
        password: "admin123",
      } as IAdmin;
      payload.password = await PasswordUtil.hashPassword(payload.password);

      const existingAdmin = await adminService.findByEmail(payload.email);

      if (existingAdmin) {
        return ResponseHelper.handleSuccess(res, "Admin already exists");
      }

      const result = await adminService.createAdmin(payload);

      return ResponseHelper.handleSuccess(res, "Admin created successfully");
    } catch (error) {
      return ResponseHelper.handleError(res, "Failed to create admin");
    }
  };
}

export const adminController = new AdminController();
