import { z } from "zod";

export const languageCreateFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const languageUpdateFormSchema = languageCreateFormSchema.partial();