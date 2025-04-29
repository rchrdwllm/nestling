"use server";

import { CreateAnnouncementSchema } from "@/schemas/CreateAnnouncementSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { Course } from "@/types";
import { getOptimisticUser } from "@/lib/user";
import { getEnrolledStudentIds, getEnrolledStudents } from "@/lib/course";
import { createNotif } from "./create-notif";
import { revalidatePath, revalidateTag } from "next/cache";

export const createAnnouncement = actionClient
  .schema(CreateAnnouncementSchema)
  .action(async ({ parsedInput }) => {
    const { title, content, courseId, id, isArchived } = parsedInput;
    const user = await getOptimisticUser();

    if (id) {
      try {
        const announcementRef = db.collection("announcements").doc(id);
        const announcementDoc = await announcementRef.get();

        if (!announcementDoc.exists) {
          return { error: "Announcement not found" };
        }

        const announcementData = announcementDoc.data() as Course;
        const updatedAnnouncementData = {
          ...announcementData,
          title,
          content,
          updatedAt: new Date().toISOString(),
          isArchived,
        };

        await announcementRef.update(updatedAnnouncementData);

        revalidateTag("announcements");

        return { success: "Announcement updated successfully" };
      } catch (error) {
        console.error("Error updating announcement:", error);

        return { error: "Failed to update announcement" };
      }
    }

    try {
      const courseRef = await db.collection("courses").doc(courseId).get();

      if (!courseRef.exists) {
        return { error: "Course not found" };
      }

      const courseData = courseRef.data() as Course;
      const id = crypto.randomUUID();
      const announcementData = {
        id,
        title,
        content,
        courseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isArchived: false,
        archivedAt: null,
        senderId: user.id,
      };
      const announcementRef = db.collection("announcements").doc(id);

      await announcementRef.set(announcementData);

      const { success, error } = await getEnrolledStudentIds(courseId);

      if (error) {
        return { error };
      } else if (success) {
        const enrolledStudents = success;

        await createNotif({
          type: "announcement",
          title: `New announcement in ${courseData.name}`,
          message: title,
          senderId: user.id,
          receiverIds: enrolledStudents,
          url: `/student-courses/${courseId}/announcements/${id}`,
        });
      }

      revalidateTag("announcements");

      return { success: "Announcement created successfully" };
    } catch (error) {
      console.error("Error creating announcement:", error);

      return { error };
    }
  });
