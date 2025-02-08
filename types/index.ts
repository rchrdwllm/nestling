export type Role = "student" | "instructor" | "admin";

export type User = {
  email: string;
  password: string;
  image: string | null;
  role: Role;
};
