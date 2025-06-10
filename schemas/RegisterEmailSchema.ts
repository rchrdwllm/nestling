import * as z from "zod";

export const RegisterEmailSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  role: z.enum(["admin", "instructor", "student"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});
