"use server";

import { RemoveFromCourseSchema } from "@/schemas/RemoveFromCourseSchema";
import { actionClient } from "../action-client";
import { getUserById } from "@/lib/user";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const removeFromCourse = actionClient
  .schema(RemoveFromCourseSchema)
  .action(async ({ parsedInput }) => {
    const { userId, courseId } = parsedInput;

    try {
      const { success: user, error: userError } = await getUserById(userId);

      if (userError || !user) {
        console.error("Error fetching user:", userError);

        return { error: userError };
      }

      const batch = db.batch();

      if (user.role === "instructor") {
        const instructorCourseRef = db
          .collection("users")
          .doc(userId)
          .collection("courses")
          .doc(courseId);
        const courseInstructorRef = db
          .collection("courses")
          .doc(courseId)
          .collection("instructors")
          .doc(userId);

        batch.delete(instructorCourseRef);
        batch.delete(courseInstructorRef);
      } else if (user.role === "student") {
        const studentCourseRef = db
          .collection("users")
          .doc(userId)
          .collection("enrolledCourses")
          .doc(courseId);
        const courseStudentRef = db
          .collection("courses")
          .doc(courseId)
          .collection("enrolledStudents")
          .doc(userId);

        batch.delete(studentCourseRef);
        batch.delete(courseStudentRef);
      }

      await batch.commit();

      revalidateTag("courses");
      revalidateTag("user");

      return { success: "User removed from course successfully" };
    } catch (error) {
      console.error("Error removing user from course:", error);

      return { error: JSON.stringify(error) };
    }
  });
