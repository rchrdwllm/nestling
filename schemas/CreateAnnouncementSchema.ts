import * as z from "zod";

export const CreateAnnouncementSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  courseId: z.string().min(1, { message: "Course ID is required" }),
});
