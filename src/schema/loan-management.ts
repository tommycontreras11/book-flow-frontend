import { LoanManagementEnum } from "@/enums/loan-management.enum";
import { z } from "zod";

export const loanManagementCreateFormSchema = z.object({
  date_return: z
    .date({
      required_error: "Date return is required",
    }),

  comment: z.string(),
});

export const loanManagementUpdateFormSchema = loanManagementCreateFormSchema.partial().merge(
  z.object({
    status: z.enum(Object.values(LoanManagementEnum) as [string, ...string[]], {
      required_error: "Person type is required",
    }),
  })
).partial();

export const loanManagementFilterSchema = z.object({
  bibliography_type: z.string().optional(),
  language: z.string().optional(),
  date_loan: z.date().optional(),
  date_return: z.date().optional(),
})
