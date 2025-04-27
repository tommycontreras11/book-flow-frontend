import { z } from "zod";

export const commentCreateFormSchema = z.object({
  content: z.string().min(1, "Content is required"),
  bookUUID: z.string().uuid("Book must be a valid UUID"),
  userUUID: z.string().uuid("User must be a valid UUID"),
  parentCommentUUID: z.string().uuid("Parent comment must be a valid UUID").optional(),
  file: z.any().optional(),
});

export const commentUpdateFormSchema = commentCreateFormSchema.partial();