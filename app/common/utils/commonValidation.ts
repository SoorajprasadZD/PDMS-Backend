import { z } from "zod";
import { Role } from "../enums";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
  role: z.enum([Role.DOCTOR, Role.INSURANCE, Role.PATIENT]),
};
