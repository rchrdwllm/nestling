"use server";

import { AddUserToCourseSchema } from "@/schemas/AddUserToCourseSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { enrollStudent } from "./enroll-student";
import { removeFromCourse } from "./remove-from-course";

export const addUserToCourse = actionClient
  .schema(AddUserToCourseSchema)
  .action(async ({ parsedInput }) => {
    const { courseId, userIds, role } = parsedInput;

    try {
      const courseSnapshot = await db.collection("courses").doc(courseId).get();

      if (!courseSnapshot.exists) {
        return { error: "Course not found" };
      }

      const batch = db.batch();

      if (role === "student") {
        const courseStudentsSnapshot = await db
          .collection("courses")
          .doc(courseId)
          .collection("enrolledStudents")
          .get();
        const enrolledStudentIds = courseStudentsSnapshot.docs.map(
          (doc) => doc.id
        );
        const removedStudentIds = enrolledStudentIds.filter(
          (id) => !userIds.includes(id)
        );

        for (const studentId of removedStudentIds) {
          await removeFromCourse({ courseId, userId: studentId });
        }
      } else if (role === "instructor") {
        const courseInstructorsSnapshot = await db
          .collection("courses")
          .doc(courseId)
          .collection("instructors")
          .get();
        const currentInstructorIds = courseInstructorsSnapshot.docs.map(
          (doc) => doc.id
        );
        const removedInstructorIds = currentInstructorIds.filter(
          (id) => !userIds.includes(id)
        );

        for (const instructorId of removedInstructorIds) {
          await removeFromCourse({ courseId, userId: instructorId });
        }
      } else {
        return { error: "Invalid role specified" };
      }

      for (const userId of userIds) {
        const userSnapshot = await db.collection("users").doc(userId).get();

        if (!userSnapshot.exists) {
          return { error: "User not found" };
        }

        if (role === "student") {
          const data = await enrollStudent({
            courseId,
            studentId: userId,
          });

          if (data?.data) {
            const { success, error } = data.data;

            if (error || !success) {
              return { error };
            }
          }
        } else if (role === "instructor") {
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

          const reference = {
            courseId,
            instructorId: userId,
            createdAt: new Date().toISOString(),
          };

          batch.set(instructorCourseRef, reference);
          batch.set(courseInstructorRef, reference);
        } else {
          return { error: "Invalid role specified" };
        }
      }

      await batch.commit();

      revalidateTag("courses");
      revalidateTag("user");

      return { success: "Users successfully updated" };
    } catch (error) {
      console.error("Error adding to course: ", error);

      return { error: JSON.stringify(error) };
    }
  });
