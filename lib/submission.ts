import { db } from "./firebase";
import { Submission } from "@/types";

export const getAssignmentSubmissions = async (contentId: string) => {
  try {
    const submissionsSnapshot = await db
      .collection("submissions")
      .where("contentId", "==", contentId)
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

export const getStudentAssignmentSubmission = async (
  contentId: string,
  studentId: string
) => {
  try {
    const submissionSnapshot = await db
      .collection("submissions")
      .where("contentId", "==", contentId)
      .where("studentId", "==", studentId)
      .get();

    const submissions = submissionSnapshot.docs.map((doc) => {
      return doc.data() as Submission;
    });

    return { success: submissions };
  } catch (error) {
    console.error(error);

    return { error: "Error fetching submissions" };
  }
};
