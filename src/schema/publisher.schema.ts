import { z } from "zod";

export const publisherCreateFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const publisherUpdateFormSchema = publisherCreateFormSchema.partial();