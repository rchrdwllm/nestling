import * as z from "zod";

export const SubmitAssignmentSchema = z.object({
  content: z.string(),
  submissionType: z.string(),
  contentId: z.string(),
});
