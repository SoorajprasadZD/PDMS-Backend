import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "app/common/models/serviceResponse";

export class ResponseHelper {
  public static handleSuccess = (
    res: Response,
    message: string,
    data?: any | null,
    statusCode = StatusCodes.OK
  ) => {
    const response = ServiceResponse.success(message, data, statusCode);
    res.status(response.statusCode).send(response);
  };

  public static handleError = (
    res: Response,
    message: string,
    data?: any | null,
    statusCode = StatusCodes.BAD_REQUEST
  ) => {
    const response = ServiceResponse.failure(message, data, statusCode);
    res.status(response.statusCode).send(response);
  };
}
