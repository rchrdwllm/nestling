import * as z from "zod";

export const CourseSearchSchema = z.object({
  query: z.string(),
});
