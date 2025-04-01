import { z } from "zod";

export const scienceCreateFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const scienceUpdateFormSchema = scienceCreateFormSchema.partial();