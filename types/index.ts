import { Timestamp } from "firebase-admin/firestore";

export type Role = "student" | "instructor" | "admin";

export type User = {
  email: string;
  password: string;
  image: string | null;
  role: Role;
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
};

export type PasswordResetToken = {
  token: string;
  email: string;
  expires: Timestamp;
};
