"use server";

import { Announcement } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getCourseAnnouncements = unstable_cache(
  async (courseId: string) => {
    try {
      const courseRef = await db.collection("courses").doc(courseId).get();

      if (!courseRef.exists) {
        return { error: "Course not found" };
      }

      const announcementsRef = await db
        .collection("announcements")
        .where("courseId", "==", courseId)
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .get();
      const announcements = announcementsRef.docs.map(
        (doc) => doc.data() as Announcement
      );

      return { success: announcements };
    } catch (error) {
      console.error("Error fetching announcements:", error);

      return { error };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60, tags: ["announcements"] }
);

export const getArchivedCourseAnnouncements = unstable_cache(
  async (courseId: string) => {
    try {
      const courseRef = await db.collection("courses").doc(courseId).get();

      if (!courseRef.exists) {
        return { error: "Course not found" };
      }

      const announcementsRef = await db
        .collection("announcements")
        .where("courseId", "==", courseId)
        .where("isArchived", "==", true)
        .orderBy("createdAt", "desc")
        .get();
      const announcements = announcementsRef.docs.map(
        (doc) => doc.data() as Announcement
      );

      return { success: announcements };
    } catch (error) {
      console.error("Error fetching announcements:", error);

      return { error };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60, tags: ["announcements"] }
);
