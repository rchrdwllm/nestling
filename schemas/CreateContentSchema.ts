import * as z from "zod";

export const CreateContentSchema = z.object({
  type: z.enum(["lesson", "assignment", "file"]),
  title: z.string(),
  moduleId: z.string(),
  courseId: z.string(),
  isPublished: z.boolean(),
  content: z.string().optional(),
  points: z.number().optional(),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  maxAttempts: z.number().optional(),
  submissionType: z.enum(["file", "text"]).optional(),
  id: z.string(),
  fileUrl: z.string().optional(),
});
