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
  type: "lesson" | "assignment" | "file";
  isLocked: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  submissionType?: "file" | "text";
  points?: number;
  maxAttempts?: number;
};

export type CloudinaryImage = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
};

export type CloudinaryFile = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
};

export type Image = {
  asset_id: string;
  content_id: string;
  public_id: string;
  created_at: string;
  secure_url: string;
  url: string;
};

export type File = {
  asset_id: string;
  content_id: string;
  public_id: string;
  created_at: string;
  secure_url: string;
  url: string;
  type: string;
};
