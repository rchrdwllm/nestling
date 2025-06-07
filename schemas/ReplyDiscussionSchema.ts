import * as z from "zod";

export const ReplyDiscussionSchema = z.object({
  discussionId: z.string().min(1, "Discussion ID is required"),
  content: z.string().min(1, "Content is required"),
  courseId: z.string().min(1, "Course ID is required"),
});
