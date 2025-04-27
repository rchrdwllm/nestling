"use server";

import { CreateContentSchema } from "@/schemas/CreateContentSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath, revalidateTag } from "next/cache";

export const createContent = actionClient
  .schema(CreateContentSchema)
  .action(async ({ parsedInput }) => {
    const {
      title,
      type,
      moduleId,
      courseId,
      content,
      date,
      submissionType,
      points,
      maxAttempts,
      id,
      isPublished,
      isEdit,
    } = parsedInput;

    if (isEdit) {
      if (type === "assignment") {
        await db.collection("contents").doc(id).update({
          title,
          type,
          moduleId,
          courseId,
          content,
          date,
          submissionType,
          points,
          maxAttempts,
          id,
          isPublished,
          updatedAt: new Date(),
        });

        revalidatePath(
          "/(instructor)/instructor-courses/[courseId]/modules/content/[contentId]",
          "page"
        );
        revalidateTag("contents");
        revalidateTag("modules");
        revalidateTag("module");

        return { success: parsedInput };
      }

      if (type === "lesson") {
        await db.collection("contents").doc(id).update({
          title,
          type,
          moduleId,
          courseId,
          content,
          id,
          isPublished,
          updatedAt: new Date(),
        });

        revalidatePath(
          "/(instructor)/instructor-courses/[courseId]/modules/content/[contentId]",
          "page"
        );
        revalidateTag("contents");
        revalidateTag("modules");
        revalidateTag("module");

        return { success: parsedInput };
      }
    }

    try {
      const newContent =
        type === "lesson"
          ? {
              title,
              type,
              moduleId,
              id,
              courseId,
              createdAt: new Date(),
              updatedAt: new Date(),
              content,
              isLocked: false,
              isPublished,
            }
          : type === "assignment"
          ? {
              title,
              type,
              moduleId,
              id,
              courseId,
              createdAt: new Date(),
              updatedAt: new Date(),
              startDate: date?.from,
              endDate: date?.to,
              submissionType,
              points,
              maxAttempts,
              isLocked: false,
              content,
              isPublished,
            }
          : {
              title,
              type,
              moduleId,
              id,
              courseId,
              createdAt: new Date(),
              updatedAt: new Date(),
              content,
              isLocked: false,
              isPublished,
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

      return { success: newContent };
    } catch (error) {
      return { error };
    }
  });
