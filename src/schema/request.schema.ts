import { StatusRequestEnum } from "@/enums/request.enum";
import { z } from "zod";

export const requestUpdateFormSchema = z.object({
  bookUUID: z.string().uuid("Book must be a valid UUID"),
  status: z.enum(Object.values(StatusRequestEnum) as [string, ...string[]]),
}).partial();
