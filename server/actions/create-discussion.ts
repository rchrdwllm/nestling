"use server";

import { CreateDiscussionSchema } from "@/schemas/CreateDiscussionSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";
import { revalidateTag } from "next/cache";
import { getEnrolledStudentIds } from "@/lib/course";
import { createNotif } from "./create-notif";
import { sendNotification } from "./send-notification";

export const createDiscussion = actionClient
  .schema(CreateDiscussionSchema)
  .action(async ({ parsedInput }) => {
    const { title, content, courseId } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const id = crypto.randomUUID();
      const discussionRef = db.collection("discussions").doc(id);

      await discussionRef.set({
        id,
        title,
        content,
        courseId,
        userId: user.id,
        isArchived: false,
        archivedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const { success: enrolledStudentIds, error } =
        await getEnrolledStudentIds(courseId);

      if (error) {
        console.error("Error fetching enrolled student IDs:", error);

        return { error };
      }

      await createNotif({
        title: `New discussion: ${title}`,
        message: `A new discussion has been created!`,
        senderId: user.id,
        type: "discussion",
        url: `/courses/${courseId}/discussions/${id}`,
        receiverIds: enrolledStudentIds,
      });
      await sendNotification({
        title: `New discussion: ${title}`,
        body: "A new discussion has been created!",
        userIds: enrolledStudentIds ?? [],
      });

      revalidateTag("discussions");

      return { success: "Successfully created discussion", id };
    } catch (error) {
      console.error("Error creating discussion:", error);

      return { error };
    }
  });
