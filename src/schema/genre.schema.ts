import { z } from "zod";

export const genreCreateFormSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
});

export const genreUpdateFormSchema = genreCreateFormSchema.partial();
