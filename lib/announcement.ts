"use server";

import { Announcement } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { parseISO } from "date-fns";

export const getAllAnnouncements = unstable_cache(
  async (studentId: string, limit: number = 5) => {
    try {
      const studentSnapshot = await db.collection("users").doc(studentId).get();

      if (!studentSnapshot.exists) {
        return { error: "Student not found" };
      }

      const enrolledCoursesSnapshot = await db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .get();
      const courseIds = enrolledCoursesSnapshot.docs.map((doc) => doc.id);
      const announcements = await Promise.all(
        courseIds.map(async (courseId) => {
          const announcementsRef = await db
            .collection("announcements")
            .where("courseId", "==", courseId)
            .where("isArchived", "==", false)
            .orderBy("createdAt", "desc")
            .get();
          return announcementsRef.docs.map((doc) =>
            doc.data()
          ) as Announcement[];
        })
      );

      const flattenedAnnouncements = announcements.flat();

      flattenedAnnouncements.sort(
        (a, b) =>
          parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
      );

      const limitedAnnouncements = flattenedAnnouncements.slice(0, limit);

      return { success: limitedAnnouncements };
    } catch (error) {
      console.error("Error fetching announcements:", error);

      return { error: "Failed to fetch announcements" };
    }
  },
  ["studentId"],
  { revalidate: 60 * 60, tags: ["announcements"] }
);

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
