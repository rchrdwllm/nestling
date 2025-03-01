"use server";

import { CreateContentSchema } from "@/schemas/CreateContentSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const createContent = actionClient
  .schema(CreateContentSchema)
  .action(async ({ parsedInput }) => {
    const { title, type, moduleId, courseId, content } = parsedInput;

    try {
      const id = crypto.randomUUID();
      const newContent = {
        title,
        type,
        moduleId,
        id,
        courseId,
        createdAt: new Date(),
        updatedAt: new Date(),
        content,
        isLocked: false,
      };

      await db.collection("contents").doc(id).set(newContent);

      const batch = db.batch();

      const moduleContentRef = db
        .collection("modules")
        .doc(moduleId)
        .collection("contents")
        .doc(id);
      const contentModuleRef = db
        .collection("contents")
        .doc(id)
        .collection("modules")
        .doc(moduleId);

      const reference = {
        moduleId: moduleId,
        contentId: id,
        createdAt: new Date(),
      };

      batch.set(moduleContentRef, reference);
      batch.set(contentModuleRef, reference);

      await batch.commit();

      revalidatePath("/(instructor)/instructor-courses/[courseId]", "page");

      return { success: `Content ${title} created` };
    } catch (error) {
      return { error };
    }
  });
