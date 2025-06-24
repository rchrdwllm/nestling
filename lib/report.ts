"use server";

import { Announcement, Content, Course, Submission, User } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { formatInTimeZone } from "date-fns-tz";

export const generateStudentsReport = unstable_cache(
  async () => {
    try {
      const studentsSnapshot = await db
        .collection("users")
        .where("role", "==", "student")
        .get();

      if (studentsSnapshot.empty) {
        return { success: [] };
      }

      const students = studentsSnapshot.docs.map((doc) => doc.data() as User);
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const csvData = students.map((student) => ({
        ID: student.id,
        "First name": student.firstName,
        "Last name": student.lastName,
        Email: student.email,
        Joined: formatInTimeZone(
          student.createdAt,
          timeZone,
          "MMMM d, yyyy HH:mm:ss zzz"
        ),
      }));

      return { success: csvData };
    } catch (error) {
      return { error: "Error generating students report" };
    }
  },
  [],
  { revalidate: 60 * 60 * 24, tags: ["user"] }
);

export const generateInstructorsReport = unstable_cache(
  async () => {
    try {
      const instructorsSnapshot = await db
        .collection("users")
        .where("role", "==", "instructor")
        .get();

      if (instructorsSnapshot.empty) {
        return { success: [] };
      }

      const instructors = instructorsSnapshot.docs.map(
        (doc) => doc.data() as User
      );
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const csvData = instructors.map((instructor) => ({
        ID: instructor.id,
        "First name": instructor.firstName,
        "Last name": instructor.lastName,
        Email: instructor.email,
        Joined: formatInTimeZone(
          instructor.createdAt,
          timeZone,
          "MMMM d, yyyy HH:mm:ss zzz"
        ),
      }));

      return { success: csvData };
    } catch (error) {
      console.error("Error generating instructors report: ", error);
      return { error: "Error generating instructors report" };
    }
  },
  [],
  { revalidate: 60 * 60 * 24, tags: ["user"] }
);

export const generateAdminsReport = unstable_cache(
  async () => {
    try {
      const adminsSnapshot = await db
        .collection("users")
        .where("role", "==", "admin")
        .get();

      if (adminsSnapshot.empty) {
        return { success: [] };
      }

      const admins = adminsSnapshot.docs.map((doc) => doc.data() as User);
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const csvData = admins.map((admin) => ({
        ID: admin.id,
        "First name": admin.firstName,
        "Last name": admin.lastName,
        Email: admin.email,
        Joined: formatInTimeZone(
          admin.createdAt,
          timeZone,
          "MMMM d, yyyy HH:mm:ss zzz"
        ),
      }));

      return { success: csvData };
    } catch (error) {
      console.error("Error generating admins report: ", error);
      return { error: "Error generating admins report" };
    }
  },
  [],
  { revalidate: 60 * 60 * 24, tags: ["user"] }
);

export const generateStudentGradesReport = unstable_cache(
  async (courseId: string, studentId: string) => {
    try {
      const studentSnapshot = await db.collection("users").doc(studentId).get();

      if (!studentSnapshot.exists) {
        return { error: `Student ${studentId} not found` };
      }

      const studentData = studentSnapshot.data() as User;

      const assignmentsSnapshot = await db
        .collection("contents")
        .where("courseId", "==", courseId)
        .where("type", "==", "assignment")
        .get();

      if (assignmentsSnapshot.empty) {
        return { success: [] };
      }

      const assignments = assignmentsSnapshot.docs.map((doc) =>
        doc.data()
      ) as Content[];

      const allSubmissions = await db
        .collection("submissions")
        .where(
          "contentId",
          "in",
          assignments.map((a) => a.id)
        )
        .where("studentId", "==", studentId)
        .orderBy("createdAt", "desc")
        .get();

      const submissionsData = allSubmissions.docs.map(
        (doc) => doc.data() as Submission
      );

      const row: Record<string, any> = {
        Name: `${studentData.firstName} ${studentData.lastName}`,
        ID: studentData.id,
      };

      let totalGrade = 0;
      let totalMaxPoints = 0;

      assignments.forEach((assignment) => {
        const studentSubmissions = submissionsData.filter(
          (submission) =>
            submission.studentId === studentId &&
            submission.contentId === assignment.id
        );

        const latestSubmission =
          studentSubmissions.length > 0 ? studentSubmissions[0] : null;

        const grade =
          latestSubmission?.grade == null
            ? "Not yet graded"
            : latestSubmission.grade;
        const maxPoints = assignment.points!;

        row[`${assignment.title}`] = grade;

        totalGrade += typeof grade === "number" ? grade : 0;
        totalMaxPoints += maxPoints;
      });

      const overallPercentage =
        totalMaxPoints > 0
          ? Math.round((totalGrade / totalMaxPoints) * 100)
          : 0;
      row.overallPercentage = `${overallPercentage}%`;

      return { success: [row] };
    } catch (error) {
      console.error("Error generating student grades report: ", error);

      return { error };
    }
  },
  [],
  { revalidate: 60 * 60, tags: ["submissions"] }
);

export const generateGradesReport = unstable_cache(
  async (studentIds: string[], courseId: string) => {
    try {
      const students = await Promise.all(
        studentIds.map(async (studentId) => {
          const student = await db.collection("users").doc(studentId).get();
          const studentData = student.data() as User;

          return studentData;
        })
      );
      const assignmentsSnapshot = await db
        .collection("contents")
        .where("courseId", "==", courseId)
        .where("type", "==", "assignment")
        .get();

      if (assignmentsSnapshot.empty) {
        return { success: [] };
      }

      const assignments = assignmentsSnapshot.docs.map((doc) =>
        doc.data()
      ) as Content[];

      const allSubmissions = await db
        .collection("submissions")
        .where(
          "contentId",
          "in",
          assignments.map((a) => a.id)
        )
        .orderBy("createdAt", "desc")
        .get();

      const submissionsData = allSubmissions.docs.map(
        (doc) => doc.data() as Submission
      );

      const csvData = students.map((student) => {
        const row: Record<string, any> = {
          Name: `${student.firstName} ${student.lastName}`,
          ID: student.id,
        };

        let totalGrade = 0;
        let totalMaxPoints = 0;

        assignments.forEach((assignment) => {
          const studentSubmissions = submissionsData.filter(
            (submission) =>
              submission.studentId === student.id &&
              submission.contentId === assignment.id
          );

          const latestSubmission =
            studentSubmissions.length > 0 ? studentSubmissions[0] : null;

          const grade =
            latestSubmission?.grade == null
              ? "Not yet graded"
              : latestSubmission.grade;
          const maxPoints = assignment.points!;

          row[`${assignment.title}`] = grade;

          totalGrade += typeof grade === "number" ? grade : 0;
          totalMaxPoints += maxPoints;
        });

        const overallPercentage =
          totalMaxPoints > 0
            ? Math.round((totalGrade / totalMaxPoints) * 100)
            : 0;
        row.overallPercentage = `${overallPercentage}%`;

        return row;
      });

      return { success: csvData };
    } catch (error) {
      console.error("Error generating grades report: ", error);

      return { error };
    }
  },
  ["studentIds", "courseId"],
  { revalidate: 60 * 60, tags: ["submissions"] }
);

export const generateSubmissionsReport = unstable_cache(
  async (contentId: string) => {
    try {
      const submissionsSnapshot = await db
        .collection("submissions")
        .where("contentId", "==", contentId)
        .orderBy("createdAt", "desc")
        .get();

      const submissions = submissionsSnapshot.docs.map((doc) => {
        return doc.data() as Submission;
      });
      const transformed = submissions.map((submission) => ({
        ...submission,
        feedback: submission.feedback || "No feedback",
        gradedAt: submission.gradedAt || "Not graded",
        grade: submission.isGraded ? submission.grade : "Not graded",
      }));

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      submissions.map((submission) => ({
        Name: submission.studentName,
        Feedback: submission.feedback || "No feedback",
        Grade: submission.isGraded ? submission.grade : "Not graded",
        "Graded At":
          formatInTimeZone(
            submission.gradedAt!,
            timeZone,
            "MMMM d, yyyy HH:mm:ss zzz"
          ) || "Not graded",
        "Submission Date": formatInTimeZone(
          submission.createdAt,
          timeZone,
          "MMMM d, yyyy HH:mm:ss zzz"
        ),
      }));

      return { success: transformed };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching submissions" };
    }
  },
  ["contentId"],
  { revalidate: 60 * 60, tags: ["submissions"] }
);

export const generateAnnouncementsReport = unstable_cache(
  async (courseId: string) => {
    try {
      const announcementsSnapshot = await db
        .collection("announcements")
        .where("courseId", "==", courseId)
        .orderBy("createdAt", "desc")
        .get();

      const announcements = announcementsSnapshot.docs.map((doc) => {
        return doc.data();
      }) as Announcement[];

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const csvData = announcements.map((announcement) => {
        return {
          Title: announcement.title,
          Content: announcement.content,
          "Posted at": formatInTimeZone(
            announcement.createdAt,
            timeZone,
            "MMMM d, yyyy HH:mm:ss zzz"
          ),
          "Sender ID": announcement.senderId,
        };
      });

      return { success: csvData };
    } catch (error) {
      console.error("Error generating announcements report: ", error);
      return { error: "Error generating announcements report" };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60, tags: ["announcements"] }
);

export const generateCourseStudentsReport = unstable_cache(
  async (courseId: string) => {
    try {
      const studentsSnapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("enrolledStudents")
        .get();

      if (studentsSnapshot.empty) {
        return { success: [] };
      }

      const studentIds = studentsSnapshot.docs.map((doc) => doc.id);
      const enrolledStudents = [];

      for (const studentId of studentIds) {
        const studentDoc = await db.collection("users").doc(studentId).get();

        if (studentDoc.exists) {
          enrolledStudents.push(studentDoc.data() as User);
        }
      }

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const csvData = enrolledStudents.map((student) => ({
        ID: student.id,
        "First name": student.firstName,
        "Last name": student.lastName,
        Email: student.email,
      }));

      return { success: csvData };
    } catch (error) {
      return { error: "Error generating course students report" };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60 * 24, tags: ["user"] }
);

export const generateCourseInstructorsReport = unstable_cache(
  async (courseId: string) => {
    try {
      const instructorsSnapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("instructors")
        .get();

      if (instructorsSnapshot.empty) {
        return { success: [] };
      }

      const instructorIds = instructorsSnapshot.docs.map((doc) => doc.id);
      const instructors = [];

      for (const instructorId of instructorIds) {
        const instructorDoc = await db
          .collection("users")
          .doc(instructorId)
          .get();

        if (instructorDoc.exists) {
          instructors.push(instructorDoc.data() as User);
        }
      }

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const csvData = instructors.map((instructor) => ({
        ID: instructor.id,
        "First name": instructor.firstName,
        "Last name": instructor.lastName,
        Email: instructor.email,
      }));

      return { success: csvData };
    } catch (error) {
      return { error: "Error generating course instructors report" };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60 * 24, tags: ["user"] }
);
