import * as z from "zod";

export const LogUserActivitySchema = z.object({
  userId: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .uuid("Invalid user ID"),
  type: z.enum(
    [
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
      "ticket_created",
      "ticket_reply",
    ],
    {
      required_error: "Type is required",
      invalid_type_error: "Type must be a valid log type",
    }
  ),
  targetId: z
    .string({
      invalid_type_error: "Target ID must be a string",
    })
    .optional(),
  details: z
    .record(z.unknown(), {
      invalid_type_error: "Details must be an object",
    })
    .optional(),
});
