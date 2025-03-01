import * as z from "zod";

export const CreateContentSchema = z.object({
  type: z.enum(["lesson", "assignment"]),
  title: z.string(),
  moduleId: z.string(),
  courseId: z.string(),
  content: z.string(),
});
