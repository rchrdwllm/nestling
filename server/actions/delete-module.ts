"use server";

import { DeleteModuleSchema } from "@/schemas/DeleteModuleSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { Module } from "@/types";
import { deleteContent } from "./delete-content";
import { revalidateTag } from "next/cache";

export const deleteModule = actionClient
  .schema(DeleteModuleSchema)
  .action(async ({ parsedInput }) => {
    const { moduleId } = parsedInput;

    try {
      const moduleRef = db.collection("modules").doc(moduleId);
      const moduleSnapshot = await moduleRef.get();

      if (!moduleSnapshot.exists) {
        return { error: "Module not found" };
      }

      const moduleData = moduleSnapshot.data() as Module;

      const batch = db.batch();

      const moduleCourseRef = db
        .collection("modules")
        .doc(moduleId)
        .collection("courses")
        .doc(moduleData.courseId);
      const courseModuleRef = db
        .collection("courses")
        .doc(moduleData.courseId)
        .collection("modules")
        .doc(moduleId);

      batch.delete(moduleCourseRef);
      batch.delete(courseModuleRef);

      const moduleContentsRef = moduleRef.collection("contents");
      const moduleContentsSnapshot = await moduleContentsRef.get();
      const moduleContentsIds = moduleContentsSnapshot.docs.map(
        (doc) => doc.id
      );

      for (const contentId of moduleContentsIds) {
        const contentRef = moduleContentsRef.doc(contentId);

        await deleteContent({ contentId });

        batch.delete(contentRef);
      }

      batch.delete(moduleRef);

      await batch.commit();

      revalidateTag("modules");
      revalidateTag("courses");

      return { success: "Module deleted successfully" };
    } catch (error) {
      console.error("Error deleting module:", error);

      return { error };
    }
  });
