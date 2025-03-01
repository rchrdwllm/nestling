"use server";

import { CreateModuleSchema } from "@/schemas/CreateModuleSchema";
import { actionClient } from "../action-client";
import { getCourseModules } from "@/lib/module";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const createModule = actionClient
  .schema(CreateModuleSchema)
  .action(async ({ parsedInput }) => {
    const { name, courseId } = parsedInput;

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

      const id = crypto.randomUUID();
      const module = {
        id,
        name,
        courseId,
        createdAt: new Date(),
        updatedAt: new Date(),
        moduleNumber: existingModules.length + 1,
      };

      await db.collection("modules").doc(id).set(module);

      const courseModuleRef = db
        .collection("courses")
        .doc(courseId)
        .collection("modules")
        .doc(id);

      await courseModuleRef.set({
        moduleId: id,
        courseId,
        createdAt: new Date(),
      });

      revalidatePath(`/instructor-courses/${courseId}`);

      return { success: `Module ${name} created` };
    } catch (error) {
      return { error };
    }
  });
