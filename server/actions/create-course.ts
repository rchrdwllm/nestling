"use server";

import { getCurrentUser } from "@/lib/user";
import { actionClient } from "../action-client";
import { CreateCourseSchema } from "@/schemas/CreateCourseSchema";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export const createCourse = actionClient
  .schema(CreateCourseSchema)
  .action(async ({ parsedInput }) => {
    const { name, description, courseCode } = parsedInput;
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Not authenticated" };
    }

    if (user.role !== "instructor") {
      return {
        error: "Not authorized, must be an instructor to create courses",
      };
    }

    try {
      const existingCourseCode = await db
        .collection("courses")
        .where("courseCode", "==", courseCode)
        .get();
      const existingCourseName = await db
        .collection("courses")
        .where("name", "==", name)
        .get();

      if (!existingCourseCode.empty) {
        return { error: "Course code already exists" };
      }

      if (!existingCourseName.empty) {
        return { error: "Course name already exists" };
      }

      const id = crypto.randomUUID();

      await db.collection("courses").doc(id).set({
        name,
        description,
        courseCode,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const courseInstructorRef = db
        .collection("courses")
        .doc(id)
        .collection("instructors")
        .doc(user.id);
      const instructorCourseRef = db
        .collection("users")
        .doc(user.id)
        .collection("courses")
        .doc(id);
      const batch = db.batch();

      const courseInstructorData = {
        courseId: id,
        instructorId: user.id,
        createdAt: new Date(),
      };

      batch.set(courseInstructorRef, courseInstructorData);
      batch.set(instructorCourseRef, courseInstructorData);

      await batch.commit();

      revalidatePath("/instructor-courses");

      return { success: "Course created successfully" };
    } catch (error) {
      return { error };
    }
  });
