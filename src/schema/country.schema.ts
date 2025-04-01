import { z } from "zod";

export const countryCreateFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const countryUpdateFormSchema = countryCreateFormSchema.partial();