import { z } from "zod";

export const bookFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
    topographicalSignature: z.string().refine((value) => value.trim().length > 0, "Name is required"),
    isbn: z.string().refine((value) => value.trim().length > 0, "Name is required"),
    publicationYear: z.number().refine((value) => value > 0, "Publication year must be greater than 0"), 
    bibliographyTypeUUID: z.string().uuid({ message: "Bibliography type must be an UUID" }).refine((value) => value.trim().length > 0, "Bibliography type is required"),
    publisherUUID: z.string().uuid({ message: "Publisher must be an UUID" }).refine((value) => value.trim().length > 0, "Publisher is required"),
    languageUUID: z.string().uuid({ message: "Language must be an UUID" }).refine((value) => value.trim().length > 0, "Language is required"),
    scienceUUID: z.string().uuid({ message: "Science must be an UUID" }).refine((value) => value.trim().length > 0, "Science is required"),
    authorUUIDs: z.array(z.string().uuid({ message: "Authors must be an UUID" })).refine((value) => value.length > 0, "Author is required")
})