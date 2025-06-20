"use server";

import { Announcement, Content, Submission, User } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

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
        student: `${studentData.firstName} ${studentData.lastName}`,
        studentId: studentData.id,
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
          student: `${student.firstName} ${student.lastName}`,
          studentId: student.id,
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

      const csvData = announcements.map((announcement) => {
        return {
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          createdAt: announcement.createdAt,
          userId: announcement.senderId,
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
