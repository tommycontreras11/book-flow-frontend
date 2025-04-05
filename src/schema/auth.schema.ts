import { z } from "zod";

export const authLoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .refine((value) => value.trim().length > 0, "Email is required"),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, "Password is required"),
});
