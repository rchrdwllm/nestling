import * as z from "zod";

export const CreateModuleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Module title must be at least 3 characters long" }),
  courseId: z.string(),
});
