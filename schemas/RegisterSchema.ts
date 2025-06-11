import * as z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(1, "Last name is required"),
    contactNumber: z
      .string()
      .min(1, "Contact number is required")
      .regex(/^\+?\d{10,15}$/, "Contact number must be a valid phone number"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email({
      message: "Invalid email format",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 8 characters long",
      })
      .regex(/(?=.*[0-9])/, {
        message: "Password must contain at least one number",
      })
      .regex(/(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=])/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password must be at least 8 characters long",
      })
      .regex(/(?=.*[0-9])/, {
        message: "Password must contain at least one number",
      })
      .regex(/(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=])/, {
        message: "Password must contain at least one special character",
      }),
    role: z.enum(["student", "instructor", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
