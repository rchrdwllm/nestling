import { Module } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getCourseModules = unstable_cache(
  async (courseId: string) => {
    try {
      const snapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("modules")
        .get();
      const moduleIds = snapshot.docs.map((doc) => doc.id);
      const modules = await Promise.all(
        moduleIds.map(async (moduleId) => {
          const moduleSnapshot = await db
            .collection("modules")
            .doc(moduleId)
            .get();

          return moduleSnapshot.data() as Module;
        })
      );

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
      return { error };
    }
  },
  ["module"],
  { revalidate: 3600 }
);
