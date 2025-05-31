import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Submission } from "@/types";

export const getAssignmentSubmissions = async (contentId: string) => {
  try {
    const submissionsSnapshot = await db
      .collection("submissions")
      .where("contentId", "==", contentId)
      .orderBy("createdAt", "desc")
      .get();

    const submissions = submissionsSnapshot.docs.map((doc) => {
      return doc.data() as Submission;
    });

    return { success: submissions };
  } catch (error) {
    console.error(error);

    return { error: "Error fetching submissions" };
  }
};

export const getSubmission = async (submissionId: string) => {
  try {
    const submissionSnapshot = await db
      .collection("submissions")
      .doc(submissionId)
      .get();

    const submission = submissionSnapshot.data() as Submission;

    return { success: submission };
  } catch (error) {
    console.error(error);

    return { error: "Error fetching submission" };
  }
};

export const getStudentAssignmentSubmission = unstable_cache(
  async (contentId: string, studentId: string) => {
    try {
      const submissionSnapshot = await db
        .collection("submissions")
        .where("contentId", "==", contentId)
        .where("studentId", "==", studentId)
        .orderBy("createdAt", "desc")
        .get();

      const submissions = submissionSnapshot.docs.map((doc) => {
        return doc.data() as Submission;
      });

      return { success: submissions };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching submissions" };
    }
  },
  ["contentId", "studentId"],
  { revalidate: 3600, tags: ["submissions"] }
);

export const getLatestAssignmentSubmission = unstable_cache(
  async (contentId: string, studentId: string) => {
    try {
      const submissionSnapshot = await db
        .collection("submissions")
        .where("contentId", "==", contentId)
        .where("studentId", "==", studentId)
        .orderBy("createdAt", "desc")
        .limit(1)
        .get();

      if (submissionSnapshot.empty) {
        return { success: null };
      }

      const submission = submissionSnapshot.docs[0].data() as Submission;

      return { success: submission };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching submission" };
    }
  },
  ["contentId", "studentId"],
  { revalidate: 3600, tags: ["submissions"] }
);

export const getStudentCourseSubmissions = unstable_cache(
  async (courseId: string, studentId: string) => {
    try {
      const assignmentsSnapshot = await db
        .collection("contents")
        .where("type", "==", "assignment")
        .where("courseId", "==", courseId)
        .get();

      if (assignmentsSnapshot.empty) {
        return { success: [] };
      }

      const assignmentIds = assignmentsSnapshot.docs.map((doc) => doc.id);
      const submissions = await Promise.all(
        assignmentIds.map(async (id) => {
          const submissionsRef = await db
            .collection("submissions")
            .where("studentId", "==", studentId)
            .where("contentId", "==", id)
            .get();

          if (submissionsRef.empty) {
            return [];
          }

          return submissionsRef.docs.map((doc) => doc.data()) as Submission[];
        })
      );

      return { success: submissions.flat() };
    } catch (error) {
      console.error("Error fetching student submissions for course: ", error);

      return { error };
    }
  },
  ["contentId", "studentId"],
  { revalidate: 60 * 60, tags: ["submissions"] }
);
