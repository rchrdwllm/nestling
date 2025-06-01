"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { EnrollSchema } from "@/schemas/EnrollSchema";
import { revalidatePath, revalidateTag } from "next/cache";

export const enrollStudent = actionClient
  .schema(EnrollSchema)
  .action(async ({ parsedInput }) => {
    const { studentId, courseId } = parsedInput;

    try {
      const existingEnrollmentDataRef = db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .doc(courseId);
      const existingEnrollmentData = await existingEnrollmentDataRef.get();

      if (existingEnrollmentData.exists) {
        return {
          error: `Already enrolled in course ${courseId}`,
        };
      }

      const enrolledCoursesRef = db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .doc(courseId);
      const enrolledStudentsRef = db
        .collection("courses")
        .doc(courseId)
        .collection("enrolledStudents")
        .doc(studentId);

      const enrollmentData = {
        courseId,
        studentId,
        createdAt: new Date().toISOString(),
        accessEnabled: true,
      };

      const batch = db.batch();

      batch.set(enrolledCoursesRef, enrollmentData);
      batch.set(enrolledStudentsRef, enrollmentData);

      await batch.commit();

      revalidatePath("/courses");
      revalidateTag("students");
      revalidateTag("courses");

      return { success: `Enrolled student in course ${courseId}` };
    } catch (error) {
      return { error };
    }
  });
