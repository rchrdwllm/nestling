"use server";

import { EditCourseAccessSchema } from "@/schemas/EditCourseAccessSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { EnrollmentData } from "@/types";
import { revalidateTag } from "next/cache";

export const editCourseAccess = actionClient
  .schema(EditCourseAccessSchema)
  .action(async ({ parsedInput }) => {
    const { courseId, studentId } = parsedInput;

    try {
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

      const batch = db.batch();

      const enrollmentDataSnapshot = await enrolledCoursesRef.get();

      if (!enrollmentDataSnapshot.exists) {
        return { error: "Enrollment does not exist" };
      }

      const enrollmentData = enrollmentDataSnapshot.data() as EnrollmentData;

      batch.update(enrolledCoursesRef, {
        accessEnabled: !enrollmentData.accessEnabled,
      });
      batch.update(enrolledStudentsRef, {
        accessEnabled: !enrollmentData.accessEnabled,
      });

      await batch.commit();

      revalidateTag("enrollmentDetails");
      revalidateTag("courses");

      return {
        success: enrollmentData.accessEnabled
          ? "Access disabled"
          : "Access enabled",
      };
    } catch (error) {
      console.error("Error updating access: ", error);

      return { error: JSON.stringify(error) };
    }
  });
