export type Role = "student" | "instructor" | "admin";
export type Activity = "login";

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
  address: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  notifsEnabled: boolean;
  lastLoginAt?: string;
  isArchived: boolean;
  archivedAt?: string | null;
};

export type RegisteredEmail = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type PasswordResetToken = {
  token: string;
  email: string;
  expires: string;
  createdAt: string;
};

export type Course = {
  id: string;
  name: string;
  courseCode: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  isArchived: boolean;
  archivedAt: string | null;
  viewCount: number;
};

export type EnrollmentData = {
  courseId: string;
  studentId: string;
  createdAt: string;
  accessEnabled: boolean;
};

export type Module = {
  id: string;
  title: string;
  moduleNumber: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isArchived: boolean;
  archivedAt: string | null;
};

export type Content = {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  content: string;
  type: "lesson" | "assignment" | "file";
  isLocked: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  submissionType?: "file" | "text";
  points?: number | null;
  maxAttempts?: number | null;
  isPublished: boolean;
  isGraded?: boolean;
};

export type Discussion = {
  id: string;
  courseId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isArchived: boolean;
  archivedAt: string | null;
};

export type DiscussionReply = {
  id: string;
  discussionId: string;
  content: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
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
  original_filename: string;
  url: string;
  type: string;
  submission_id?: string;
  resource_type: string;
  hash: string;
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
  gradedAt: string | null;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  archivedAt: string | null;
  senderId: string;
};

export type UniversalAnnouncement = {
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  archivedAt: string | null;
};

export type Message = {
  id: string;
  message?: string;
  senderId: string;
  receiverId: string;
  channelId: string;
  string: string;
  type: "text" | "file";
  timestamp: string;
};

export type MessageWithFiles = Message & {
  files: File[];
};

export type Thread = {
  id: string;
  channelId: string;
  userIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  url: string;
  senderId: string;
  createdAt: string;
  isRead: boolean;
  isArchived: boolean;
  archivedAt: string | null;
  receiverIds: string[];
};

export type PendingTask = {
  name: string;
  courseCode: string;
  courseName: string;
  timeAgo: string;
};

export type MonthlyActivity = {
  id: string;
  type: Activity;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type MonthlyActiveUserRecord = {
  month: string;
  activeUsers: number;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  projectHeads: string[];
  projectAssociates: string[];
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  archivedAt: string | null;
  ownerId: string;
  status: "planned" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  status: "planned" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  projectId: string;
  assignees: string[];
  isArchived: boolean;
  archivedAt: string | null;
};

export type UserActivity = {
  id: string;
  userId: string;
  type:
    | "login"
    | "logout"
    | "register"
    | "view_course"
    | "view_content"
    | "view_project"
    | "submit_assignment"
    | "grade_submission"
    | "update_profile"
    | "enroll_course"
    | "ticket_created"
    | "ticket_reply";
  createdAt: string;
  targetId?: string | null;
  details?: Record<string, any> | null;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  category:
    | "course_content"
    | "technical_issue"
    | "enrollment"
    | "grading"
    | "account"
    | "feedback"
    | "other";
  userId: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  archivedAt: string | null;
};

export type TicketReply = {
  id: string;
  ticketId: string;
  userId: string;
  reply: string;
  createdAt: string;
  updatedAt: string;
};
