import * as z from "zod";

export const ReplyDiscussionSchema = z.object({
  discussionId: z
    .string({
      required_error: "Discussion ID is required",
      invalid_type_error: "Discussion ID must be a string",
    })
    .min(1, { message: "Discussion ID is required" }),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1, { message: "Content is required" }),
  courseId: z
    .string({
      required_error: "Course ID is required",
      invalid_type_error: "Course ID must be a string",
    })
    .min(1, { message: "Course ID is required" }),
});
