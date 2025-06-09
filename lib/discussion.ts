"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Discussion } from "@/types";

export const getDiscussionById = unstable_cache(
  async (discussionId: string) => {
    try {
      const discussionSnapshot = await db
        .collection("discussions")
        .doc(discussionId)
        .get();

      if (!discussionSnapshot.exists) {
        return { error: "Discussion not found" };
      }

      const discussionData = discussionSnapshot.data() as Discussion;

      return { success: discussionData };
    } catch (error) {
      console.error("Error fetching discussion by ID:", error);

      return { error };
    }
  },
  ["discussionId"],
  { revalidate: 60 * 60, tags: ["discussions"] }
);

export const getDiscussionsByCourseId = unstable_cache(
  async (courseId: string) => {
    try {
      const discussionsSnapshot = await db
        .collection("discussions")
        .where("courseId", "==", courseId)
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .get();
      const discussions: Discussion[] = discussionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Discussion[];

      return { success: discussions };
    } catch (error) {
      console.error("Error fetching discussions by course ID:", error);

      return { error };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60, tags: ["discussions"] }
);

export const getArchivedDiscussionsByCourseId = unstable_cache(
  async (courseId: string) => {
    try {
      const archivedDiscussionsSnapshot = await db
        .collection("discussions")
        .where("courseId", "==", courseId)
        .where("isArchived", "==", true)
        .orderBy("createdAt", "desc")
        .get();
      const archivedDiscussions: Discussion[] =
        archivedDiscussionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Discussion[];

      return { success: archivedDiscussions };
    } catch (error) {
      console.error("Error fetching archived discussions by course ID:", error);

      return { error };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60, tags: ["discussions"] }
);
