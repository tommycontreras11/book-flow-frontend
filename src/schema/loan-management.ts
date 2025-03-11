import { z } from "zod";

export const loanManagementFormSchema = z.object({
  date_return: z
    .date({
      required_error: "Date return is required",
    }),

  comment: z.string(),
});
