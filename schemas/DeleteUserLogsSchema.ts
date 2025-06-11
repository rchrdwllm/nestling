import * as z from "zod";

export const DeleteUserLogsSchema = z.object({
  types: z
    .array(
      z.enum(
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
      )
    )
    .nonempty({
      message: "Types array is required",
    }),
});
