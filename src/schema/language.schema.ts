import { z } from "zod";

export const formLanguageSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})