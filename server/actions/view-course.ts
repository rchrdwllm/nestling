"use server";

import { ViewCourseSchema } from "@/schemas/ViewCourseSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export const viewCourse = actionClient
  .schema(ViewCourseSchema)
  .action(async ({ parsedInput }) => {
    const { courseId } = parsedInput;

    try {
      const courseRef = db.collection("courses").doc(courseId);

      await courseRef.update({
        viewCount: FieldValue.increment(1),
      });

      return { success: true };
    } catch (error) {
      console.error("Error incrementing course views:", error);

      return { error: JSON.stringify("Failed to increment course views") };
    }
  });
