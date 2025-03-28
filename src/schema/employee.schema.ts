import { WorkShiftEnum } from "@/enums/common.enum";
import { z } from "zod";

export const employeeFormSchema = z
  .object({
    name: z
      .string()
      .refine((value) => value.trim().length > 0, "Name is required"),
    email: z
      .string()
      .email({ message: "Invalid email" })
      .refine((value) => value.trim().length > 0, "Email is required"),
    password: z
      .string()
      .refine((value) => value.trim().length > 0, "Password is required"),
    identification: z
      .string()
      .min(11, "Identification must be at least 11 characters")
      .max(100, "Identification must be less than 100 characters"),
    work_shift: z.enum(Object.values(WorkShiftEnum) as [string, ...string[]], {
      required_error: "Person type is required",
    }),
    commission_percentage: z.coerce.number().min(0).max(100),
    entry_date: z
      .date()
      .refine(
        (value) => value <= new Date(),
        "Entry date must be less than or equal to today's date"
      ),
  })
  .required();
