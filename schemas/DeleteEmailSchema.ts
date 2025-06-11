import * as z from "zod";

export const DeleteEmailSchema = z.object({
  email: z.string().email().min(5, "Email must be at least 5 characters long"),
});
