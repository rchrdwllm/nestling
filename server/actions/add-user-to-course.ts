"use server";

import { AddUserToCourseSchema } from "@/schemas/AddUserToCourseSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { enrollStudent } from "./enroll-student";

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

      return { success: "Successfully added to course" };
    } catch (error) {
      console.error("Error adding to course: ", error);

      return { error };
    }
  });
