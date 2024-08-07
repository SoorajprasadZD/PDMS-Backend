import { Role } from "app/common/enums";
import { z } from "zod";

export const createDoctorSchema = z.object({
  body: z.object({
    name: z.string({ message: "name required" }),
    email: z
      .string({ message: "email required" })
      .email("Invalid email format"),
    password: z
      .string({ message: "password required" })
      .min(6, "password must be at least 6 characters"),
    address: z.string({ message: "address required" }),
    state: z.string({ message: "state required" }),
    phone: z
      .string({ message: "phone number required"})
      .length(10, "phone number must be exactly 10 digits")
      .regex(/^\d+$/, "phone number must contain only digits"),
  }),
});

export const doctorLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "email required" })
      .email("Invalid email format"),
    password: z
      .string({ message: "password required" })
      .min(6, "password must be at least 6 characters"),
    role: z.enum([Role.DOCTOR]),
  }),
});