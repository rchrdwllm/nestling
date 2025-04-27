import { Timestamp as FSTimestamp } from "firebase-admin/firestore";

export type Timestamp = FSTimestamp & {
  _seconds: number;
  _nanoseconds: number;
};

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
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
  name?: string;
};

export type PasswordResetToken = {
  token: string;
  email: string;
  expires: Timestamp;
  createdAt: Timestamp;
};

export type Course = {
  id: string;
  name: string;
  courseCode: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  image: string;
  isArchived: boolean;
  archivedAt: Timestamp | null;
};

export type EnrollmentData = {
  courseId: string;
  studentId: string;
  createdAt: Timestamp;
};

export type Module = {
  id: string;
  title: string;
  moduleNumber: number;
  courseId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPublished: boolean;
  isArchived: boolean;
  archivedAt: Timestamp | null;
};

export type Content = {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  content: string;
  type: "lesson" | "assignment" | "file";
  isLocked: boolean;
  startDate?: Timestamp;
  endDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  submissionType?: "file" | "text";
  points?: number;
  maxAttempts?: number;
  isPublished: boolean;
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
  user_id: string;
};

export type File = {
  asset_id: string;
  content_id: string;
  public_id: string;
  created_at: string;
  secure_url: string;
  url: string;
  type: string;
  submission_id?: string;
  resource_type: string;
};

export type Submission = {
  studentId: string;
  studentName: string;
  type: string;
  contentId: string;
  fileId: string;
  id: string;
  createdAt: string;
  secureUrl: string;
  isGraded: boolean;
  grade: number | null;
  content: string;
  feedback: string | undefined;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isArchived: boolean;
  archivedAt: Timestamp | null;
  senderId: string;
};

export type Message = {
  id: string;
  message?: string;
  senderId: string;
  receiverId: string;
  channelId: string;
  timestamp: string;
  type: "text" | "file";
};

export type MessageWithFiles = Message & {
  files: File[];
};

export type Thread = {
  id: string;
  channelId: string;
  userIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  url: string;
  senderId: string;
  createdAt: Timestamp;
  isRead: boolean;
  isArchived: boolean;
  archivedAt: Timestamp | null;
  receiverIds: string[];
};

export type PendingTask = {
  name: string;
  courseCode: string;
  courseName: string;
  timeAgo: string;
};
