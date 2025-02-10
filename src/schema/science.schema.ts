import { z } from "zod";

export const scienceFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})