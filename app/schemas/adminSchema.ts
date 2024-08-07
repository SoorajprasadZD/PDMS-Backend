import { Role } from "app/common/enums";
import { z } from "zod";

export const adminLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "email required" })
      .email("Invalid email format"),
    password: z
      .string({ message: "password required" })
      .min(6, "password must be at least 6 characters"),
    role: z.enum([Role.ADMIN]),
  }),
});
