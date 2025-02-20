import { Module } from "@/types";
import { db } from "./firebase";

export const getCourseModules = async (courseId: string) => {
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
};
