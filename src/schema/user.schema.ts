import { PersonTypeEnum } from "@/enums/common.enum";
import { z } from "zod";

export const userFormSchema = z
  .object({
    name: z
      .string()
      .refine((value) => value.trim().length > 0, "Name is required"),
    email: z
      .string()
      .email({ message: "Invalid email" })
      .refine((value) => value.trim().length > 0, "Email is required"),
    password: z.string().refine((value) => value.trim().length > 0, "Password is required"),
    identification: z
      .string()
      .min(11, "Identification must be at least 11 characters")
      .max(100, "Identification must be less than 100 characters"),
    person_type: z.enum([PersonTypeEnum.LEGAL, PersonTypeEnum.NATURAL], {
      required_error: "Person type is required",
    }),
  })
  .required();
