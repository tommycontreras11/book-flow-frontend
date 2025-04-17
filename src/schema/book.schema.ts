import { z } from "zod";

const isBrowser = typeof window !== "undefined";

export const bookCreateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  topographicalSignature: z.string().min(1, "Topographical Signature is required"),
  isbn: z.string().min(1, "ISBN is required"),
  publishedDate: z
  .date()
  .refine(
    (value) => value <= new Date(),
    "Entry date must be less than or equal to today's date"
  ),
  pages: z.coerce.number().min(1, "Pages must be greater than 0"),
  bibliographyTypeUUID: z.string().uuid("Bibliography type must be a valid UUID"),
  publisherUUID: z.string().uuid("Publisher must be a valid UUID"),
  languageUUID: z.string().uuid("Language must be a valid UUID"),
  scienceUUID: z.string().uuid("Science must be a valid UUID"),
  authorUUIDs: z.array(z.string().uuid("Authors must be a valid UUID")).min(1, "At least one author is required"),
  genreUUIDs: z.array(z.string().uuid("Genres must be a valid UUID")).min(1, "At least one genre is required"),
  file: isBrowser
    ? z.instanceof(File, { message: "File is required" })
    : z.any().optional(),
});

export const bookFilterSchema = z.object({
  science: z.string().optional()
})

export const bookUpdateFormSchema = bookCreateFormSchema.partial();