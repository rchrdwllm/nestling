"use server";

import { PublishModuleSchema } from "@/schemas/PublishModuleSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const publishModule = actionClient
  .schema(PublishModuleSchema)
  .action(async ({ parsedInput }) => {
    const { moduleId, defaultPublished } = parsedInput;

    try {
      const moduleRef = db.collection("modules").doc(moduleId);

      await moduleRef.update({
        isPublished: !defaultPublished,
      });

      const successMessage = `Module ${
        defaultPublished ? "unpublished" : "published"
      } successfully`;

      revalidatePath("/courses/[courseId]", "page");

      return { success: successMessage };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  });
