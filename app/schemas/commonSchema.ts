import { Role } from "app/common/enums";
import { z } from "zod";

export const verifyLinkSchema = z.object({
    body: z.object({
      id: z
        .string({ message: "id required" }),
      role: z.enum([Role.DOCTOR, Role.INSURANCE, Role.PATIENT]),
    }),
  });