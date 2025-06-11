import * as z from "zod";

export const CreateCourseSchema = z.object({
  name: z
    .string({ required_error: "Course name is required" })
    .min(3, { message: "Course name must be at least 3 characters long" }),
  courseCode: z
    .string({ required_error: "Course code is required" })
    .min(3, { message: "Course code must be at least 3 characters long" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(8, { message: "Description must be at least 8 characters long" }),
  image: z
    .string({ required_error: "Course image is required" })
    .nonempty({ message: "Please upload a course image" }),
  isEdit: z.boolean().optional(),
  courseId: z.string().optional(),
  isAdmin: z.boolean().optional(),
  instructors: z
    .array(z.string({ required_error: "Instructor ID is required" }), {
      invalid_type_error: "Instructors must be an array of strings",
    })
    .optional(),
  defaultInstructors: z
    .array(z.string({ required_error: "Default instructor ID is required" }), {
      invalid_type_error: "Default instructors must be an array of strings",
    })
    .optional(),
});
