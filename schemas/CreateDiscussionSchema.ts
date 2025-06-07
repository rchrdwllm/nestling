import * as z from "zod";

export const CreateDiscussionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
  courseId: z.string().uuid("Invalid course ID format"),
});
