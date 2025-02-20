"use server";

import { CourseSearchSchema } from "@/schemas/CourseSearchSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { Course } from "@/types";
import { revalidatePath } from "next/cache";

export const searchCourses = actionClient
  .schema(CourseSearchSchema)
  .action(async ({ parsedInput }) => {
    const { query } = parsedInput;

    try {
      const nameQ = db.collection("courses").where("name", "==", query);
      const courseCodeQ = db
        .collection("courses")
        .where("courseCode", "==", query);

      const results = await Promise.all([nameQ.get(), courseCodeQ.get()]);
      const courses: Course[] = [];
      const seenIds = new Set();

      results.forEach((snapshot) => {
        snapshot.forEach((doc) => {
          if (!seenIds.has(doc.id)) {
            courses.push({ id: doc.id, ...doc.data() } as Course);
            seenIds.add(doc.id);
          }
        });
      });

      revalidatePath("/student-dashboard/courses");

      return { courses };
    } catch (error) {
      return { error };
    }
  });
