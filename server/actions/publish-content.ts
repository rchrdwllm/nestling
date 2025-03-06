"use server";

import { PublishContentSchema } from "@/schemas/PublishContentSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const publishContent = actionClient
  .schema(PublishContentSchema)
  .action(async ({ parsedInput }) => {
    const { contentId, defaultPublished } = parsedInput;

    try {
      const contentRef = db.collection("contents").doc(contentId);

      await contentRef.update({
        isPublished: !defaultPublished,
      });

      const successMessage = `Content ${
        defaultPublished ? "unpublished" : "published"
      } successfully`;

      revalidatePath("/(instructor)/instructor-courses/[courseId]", "page");

      return { success: successMessage };
    } catch (error) {
      console.error(error);

      return { error };
    }
  });
