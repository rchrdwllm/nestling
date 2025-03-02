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
      return { error: "Error fetching modules" };
    }
  },
  ["modules"],
  { revalidate: 3600 }
);

export const getModule = unstable_cache(
  async (moduleId: string) => {
    try {
      const snapshot = await db.collection("modules").doc(moduleId).get();
      const module = snapshot.data() as Module;

      return { success: module };
    } catch (error) {
      return { error: "Error fetching module" };
    }
  },
  ["module"],
  { revalidate: 3600 }
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
      return { error: "Error fetching module names" };
    }
  },
  ["moduleNames"],
  { revalidate: 3600 }
);
