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
