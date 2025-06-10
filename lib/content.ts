"use server";

import { Content, Course, File } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { getEnrolledCourses } from "./course";

export const getModuleContents = unstable_cache(
  async (moduleId: string) => {
    try {
      const snapshot = await db
        .collection("contents")
        .where("moduleId", "==", moduleId)
        .orderBy("createdAt", "asc")
        .get();
      const contents = snapshot.docs.map((doc) => doc.data() as Content);

      return { success: contents };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  },
  ["contents"],
  { revalidate: 3600, tags: ["contents"] }
);

export const getPublishedModuleContents = unstable_cache(
  async (moduleId: string) => {
    try {
      const snapshot = await db
        .collection("contents")
        .where("moduleId", "==", moduleId)
        .where("isPublished", "==", true)
        .orderBy("createdAt", "asc")
        .get();
      const contents = snapshot.docs.map((doc) => doc.data() as Content);

      return { success: contents };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["contents"],
  { revalidate: 3600, tags: ["contents"] }
);

export const getContentFile = unstable_cache(
  async (contentId: string) => {
    try {
      const snapshot = await db
        .collection("contents")
        .doc(contentId)
        .collection("files")
        .get();
      const file = snapshot.docs[0].data() as File;

      return { success: file };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching file" };
    }
  },
  ["contents"],
  { revalidate: 3600, tags: ["contents", "files"] }
);

export const getModuleContent = unstable_cache(
  async (contentId: string) => {
    try {
      const snapshot = await db.collection("contents").doc(contentId).get();
      const content = snapshot.data() as Content;

      return { success: content };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching content" };
    }
  },
  ["contents"],
  { revalidate: 3600, tags: ["contents"] }
);

export const getCourseAssignments = unstable_cache(
  async (courseId: string) => {
    try {
      const assignmentsRef = await db
        .collection("contents")
        .where("courseId", "==", courseId)
        .where("type", "==", "assignment")
        .get();

      if (assignmentsRef.empty) {
        return { success: [] };
      }

      const assignments = assignmentsRef.docs.map(
        (doc) => doc.data() as Content
      );

      return { success: assignments };
    } catch (error) {
      return { error };
    }
  },
  ["courseId"],
  { tags: ["contents", "assignments"] }
);

export const getUpcomingAssignments = unstable_cache(
  async (courseId: string) => {
    try {
      const assignmentsRef = await db
        .collection("contents")
        .where("courseId", "==", courseId)
        .where("type", "==", "assignment")
        .get();
      const assignments = assignmentsRef.docs.map(
        (doc) => doc.data() as Content
      );
      const filteredAssignments = assignments.filter((assignment) => {
        const now = new Date();
        const endDate = new Date(assignment.endDate!);
        return endDate > now;
      });

      return { success: filteredAssignments };
    } catch (error) {
      console.error("Error fetching upcoming assignments: ", error);

      return { error };
    }
  },
  ["courseId"],
  { tags: ["contents", "assignments"], revalidate: 3600 }
);

export const getUpcomingAssignmentsForStudent = unstable_cache(
  async (userId: string) => {
    try {
      const { success: courses, error } = await getEnrolledCourses(userId);

      if (error) return { error };

      if (!courses) return { success: [] };

      const assignmentsArr = await Promise.all(
        courses.map(async (course: Course) => {
          const { success: assignments } = await getUpcomingAssignments(
            course.id
          );

          return assignments || [];
        })
      );

      const allAssignments = assignmentsArr.flat();

      return { success: allAssignments };
    } catch (error) {
      console.error("Error fetching upcoming assignments: ", error);

      return { error: "Error fetching upcoming assignments for student" };
    }
  },
  ["userId"],
  { revalidate: 3600, tags: ["contents", "assignments"] }
);
