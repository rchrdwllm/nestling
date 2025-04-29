"use server";

import { CreateModuleSchema } from "@/schemas/CreateModuleSchema";
import { actionClient } from "../action-client";
import { getCourseModules, getModule } from "@/lib/module";
import { db } from "@/lib/firebase";
import { revalidatePath, revalidateTag } from "next/cache";

export const createModule = actionClient
  .schema(CreateModuleSchema)
  .action(async ({ parsedInput }) => {
    const { title, courseId, isEdit, moduleId } = parsedInput;

    try {
      const { success: existingModules, error } = await getCourseModules(
        courseId
      );

      if (error) {
        return { error };
      }

      if (!existingModules) {
        return { error: "Course not found" };
      }

      if (isEdit && moduleId) {
        await db.collection("modules").doc(moduleId).update({
          title,
          updatedAt: new Date().toISOString(),
        });

        revalidatePath("/(instructor)/instructor-courses/[courseId]", "page");
        revalidatePath(`/(instructor)/instructor-courses/${courseId}`);

        return { success: `Module updated successfully` };
      }

      const id = crypto.randomUUID();
      const module = {
        id,
        title,
        courseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: true,
        moduleNumber: existingModules.length + 1,
        isArchived: false,
      };

      await db.collection("modules").doc(id).set(module);

      const batch = db.batch();

      const courseModuleRef = db
        .collection("courses")
        .doc(courseId)
        .collection("modules")
        .doc(id);
      const moduleCourseRef = db
        .collection("modules")
        .doc(id)
        .collection("courses")
        .doc(courseId);

      const reference = {
        moduleId: id,
        courseId,
        createdAt: new Date().toISOString(),
      };

      batch.set(courseModuleRef, reference);
      batch.set(moduleCourseRef, reference);

      await batch.commit();

      revalidatePath("/(instructor)/instructor-courses/[courseId]", "page");
      revalidatePath(
        "/(instructor)/instructor-courses/[courseId]/create",
        "page"
      );
      revalidatePath(`/(instructor)/instructor-courses/${courseId}`);
      revalidateTag("modules");
      revalidateTag("courses");

      return { success: `Module ${title} created` };
    } catch (error) {
      return { error };
    }
  });
