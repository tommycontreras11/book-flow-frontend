import { z } from "zod";

export const bibliographyTypeCreateFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const bibliographyTypeUpdateFormSchema = bibliographyTypeCreateFormSchema.partial();