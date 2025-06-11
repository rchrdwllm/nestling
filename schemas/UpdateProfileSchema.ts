import * as z from "zod";

export const UpdateProfileSchema = z.object({
  userId: z.string().nonempty(),
  firstName: z.string().nonempty().max(50, {
    message: "First name must be at most 50 characters long",
  }),
  middleName: z
    .string()
    .max(50, {
      message: "Middle name must be at most 50 characters long",
    })
    .optional()
    .default(""),
  lastName: z.string().nonempty().max(50, {
    message: "Last name must be at most 50 characters long",
  }),
  contactNumber: z.string().nonempty().max(50, {
    message: "Contact number must be at most 50 characters long",
  }),
  address: z.string().nonempty().max(200, {
    message: "Address must be at most 200 characters long",
  }),
  email: z.string().email({
    message: "Invalid email format",
  }),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
      message:
        "Password must contain at least one special character and one number",
    })
    .optional()
    .or(z.literal("")),
  image: z.string().optional(),
});
