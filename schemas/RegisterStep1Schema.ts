import * as z from "zod";

export const RegisterStep1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().min(1, "Middle name is required"),
  lastName: z.string().min(1, "Last name is required"),
  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^\+?\d{10,15}$/, "Contact number must be a valid phone number"),
  address: z.string().min(1, "Address is required"),
});
