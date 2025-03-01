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
  createdAt: Date;
  updatedAt: Date;
};

export type PasswordResetToken = {
  token: string;
  email: string;
  expires: Date;
  createdAt: Date;
};

export type Course = {
  id: string;
  name: string;
  courseCode: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EnrollmentData = {
  courseId: string;
  studentId: string;
  createdAt: Date;
};

export type Module = {
  id: string;
  title: string;
  moduleNumber: number;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Content = {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  content: string;
  type: "lesson" | "assignment";
  isLocked: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};
