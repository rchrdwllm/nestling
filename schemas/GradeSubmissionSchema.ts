import * as z from "zod";

export const GradeSubmissionSchema = z.object({
  studentId: z.string(),
  contentId: z.string(),
  submissionId: z.string(),
  grade: z.string().nonempty(),
  feedback: z.string().optional(),
  regrade: z.boolean().optional(),
});
