import * as z from "zod";

export const CreateCourseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Course name must be at least 3 characters long" }),
  courseCode: z
    .string()
    .min(3, { message: "Course code must be at least 3 characters long" }),
  description: z
    .string()
    .min(8, { message: "Description must be at least 8 characters long" }),
  image: z.string().nonempty({ message: "Please upload a course image" }),
  isEdit: z.boolean().optional(),
  courseId: z.string().optional(),
  isAdmin: z.boolean().optional(),
  instructors: z.array(z.string()).optional(),
  defaultInstructors: z.array(z.string()).optional(),
});
