import * as z from "zod";

export const DeleteUserLogsSchema = z.object({
  types: z.array(
    z.enum([
      "login",
      "logout",
      "register",
      "view_course",
      "view_content",
      "view_project",
      "submit_assignment",
      "grade_submission",
      "update_profile",
    ])
  ),
});
