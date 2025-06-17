import * as z from "zod";

export const AddUserToCourseSchema = z.object({
  courseId: z.string().nonempty({ message: "Course ID is required" }),
  userIds: z
    .array(z.string().nonempty({ message: "User ID is required" }))
    .nonempty({ message: "At least one user ID is required" }),
  role: z.enum(["student", "instructor"], {
    errorMap: () => ({ message: "Role must be student or instructor" }),
  }),
});
