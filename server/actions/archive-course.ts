"use server";

import { ArchiveCourseSchema } from "@/schemas/ArchiveCourseSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";
import { Course } from "@/types";

export const archiveCourse = actionClient
  .schema(ArchiveCourseSchema)
  .action(async ({ parsedInput }) => {
    const { courseId } = parsedInput;

    try {
      const courseRef = db.collection("courses").doc(courseId);
      const courseSnapshot = await courseRef.get();

      if (!courseSnapshot.exists) {
        return { error: "Course not found" };
      }

      const course = courseSnapshot.data() as Course;

      await courseRef.update({
        isArchived: course.isArchived ? false : true,
        archivedAt: new Date(),
      });

      revalidatePath("/instructor-courses");
      revalidatePath("/instructor-courses/archive");

      return {
        success: `Course ${course.isArchived ? "unarchived" : "archived"}`,
      };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });
