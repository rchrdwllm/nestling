import * as z from "zod";

export const CreateModuleSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Module name must be at least 3 characters long" }),
  courseId: z.string(),
});
