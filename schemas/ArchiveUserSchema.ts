import * as z from "zod";

export const ArchiveUserSchema = z.object({
  userId: z
    .string()
    .uuid({ message: "Invalid user ID format. Must be a valid UUID." }),
});
