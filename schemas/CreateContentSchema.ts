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
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  maxAttempts: z.number().optional(),
  submissionType: z
    .enum(["text", "pdf", "docx", "xlsx", "pptx", "mp4", "other"])
    .optional(),
  id: z.string(),
  fileUrl: z.string().optional(),
  isEdit: z.boolean(),
});
