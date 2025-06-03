import * as z from "zod";

export const LogUserActivitySchema = z.object({
  userId: z.string().uuid(),
  type: z.enum([
    "login",
    "logout",
    "register",
    "view_course",
    "view_content",
    "view_project",
    "submit_assignment",
    "grade_submission",
    "update_profile",
    "enroll_course",
  ]),
  targetId: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});
