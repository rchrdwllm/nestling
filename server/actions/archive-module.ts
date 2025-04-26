"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { ArchiveModuleSchema } from "@/schemas/ArchiveModuleSchema";
import { Module } from "@/types";
import { revalidatePath } from "next/cache";

export const archiveModule = actionClient
  .schema(ArchiveModuleSchema)
  .action(async ({ parsedInput }) => {
    const { moduleId, courseId } = parsedInput;

    try {
      const moduleRef = db.collection("modules").doc(moduleId);
      const moduleSnapshot = await moduleRef.get();

      if (!moduleSnapshot.exists) {
        return { error: "Module not found" };
      }

      const module = moduleSnapshot.data() as Module;

      await moduleRef.update({
        isArchived: module.isArchived ? false : true,
        archivedAt: new Date(),
      });

      revalidatePath("/(instructor)/instructor-courses/[courseId]", "page");
      revalidatePath(`/instructor-courses/${courseId}`);
      revalidatePath(`/instructor-courses/${courseId}/archive`);

      return {
        success: `Module ${module.isArchived ? "unarchived" : "archived"}`,
      };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });
