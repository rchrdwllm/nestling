import * as z from "zod";

export const CreateDiscussionSchema = z.object({
  id: z.string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string",
  }),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
  courseId: z
    .string({
      required_error: "Course ID is required",
      invalid_type_error: "Course ID must be a string",
    })
    .uuid("Invalid course ID format"),
});
