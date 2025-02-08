import { z } from "zod";

export const formAuthorSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
    birthCountryUUID: z.string().uuid({ message: "Birth country must be an UUID" }).refine((value) => value.trim().length > 0, "Birth country is required"),
    nativeLanguageUUID: z.string().uuid({ message: "Native language must be an UUID" }).refine((value) => value.trim().length > 0, "Native language is required"),
})