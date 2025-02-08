import * as z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().nonempty().max(50, {
      message: "First name must be at most 50 characters long",
    }),
    middleName: z.optional(
      z
        .string()
        .max(50, {
          message: "Middle name must be at most 50 characters long",
        })
        .default("")
    ),
    lastName: z.string().nonempty().max(50, {
      message: "Last name must be at most 50 characters long",
    }),
    contactNumber: z.string().nonempty().max(50, {
      message: "Contact number must be at most 50 characters long",
    }),
    email: z.string().email({
      message: "Invalid email format",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    role: z.enum(["student", "instructor", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
