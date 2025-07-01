import { Module } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getCourseModules = unstable_cache(
  async (courseId: string) => {
    try {
      const modulesSnapshot = await db
        .collection("modules")
        .where("courseId", "==", courseId)
        .orderBy("createdAt", "asc")
        .get();
      const modules = modulesSnapshot.docs.map((doc) => {
        return doc.data() as Module;
      });

      return { success: modules };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching modules" };
    }
  },
  ["modules"],
  { revalidate: 3600, tags: ["modules"] }
);

export const getUnarchivedCourseModules = unstable_cache(
  async (courseId: string) => {
    try {
      const modulesSnapshot = await db
        .collection("modules")
        .where("courseId", "==", courseId)
        .where("isArchived", "==", false)
        .orderBy("createdAt", "asc")
        .get();
      const modules = modulesSnapshot.docs.map((doc) => {
        return doc.data() as Module;
      });

      return { success: modules };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching modules" };
    }
  },
  ["modules"],
  { revalidate: 3600, tags: ["modules"] }
);

export const getArchivedCourseModules = unstable_cache(
  async (courseId: string) => {
    try {
      const modulesSnapshot = await db
        .collection("modules")
        .where("courseId", "==", courseId)
        .where("isArchived", "==", true)
        .orderBy("createdAt", "asc")
        .get();
      const modules = modulesSnapshot.docs.map((doc) => {
        return doc.data() as Module;
      });

      return { success: modules };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching modules" };
    }
  },
  ["modules"],
  { revalidate: 3600, tags: ["modules"] }
);

export const getPublishedCourseModules = unstable_cache(
  async (courseId: string) => {
    try {
      const modulesSnapshot = await db
        .collection("modules")
        .where("courseId", "==", courseId)
        .where("isPublished", "==", true)
        .where("isArchived", "==", false)
        .orderBy("createdAt", "asc")
        .get();
      const modules = modulesSnapshot.docs.map((doc) => {
        return doc.data() as Module;
      });

      return { success: modules };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching modules" };
    }
  },
  ["modules"],
  { revalidate: 3600, tags: ["modules"] }
);

export const getModule = unstable_cache(
  async (moduleId: string) => {
    try {
      const snapshot = await db.collection("modules").doc(moduleId).get();
      const module = snapshot.data() as Module;

      return { success: module };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching module" };
    }
  },
  ["module"],
  { revalidate: 3600, tags: ["modules"] }
);

export const getModuleTitles = unstable_cache(
  async (courseId: string) => {
    try {
      const snapshot = await db
        .collection("modules")
        .where("courseId", "==", courseId)
        .select("title", "moduleNumber", "id")
        .get();
      const modules = snapshot.docs.map(
        (doc) =>
          doc.data() as {
            title: string;
            moduleNumber: number;
            id: string;
          }
      );

      return { success: modules };
    } catch (error) {
      console.error(error);

      return { error: "Error fetching module names" };
    }
  },
  ["moduleNames"],
  { revalidate: 3600, tags: ["modules"] }
);
