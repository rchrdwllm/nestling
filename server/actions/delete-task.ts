"use server";

import { DeleteTaskSchema } from "@/schemas/DeleteTaskSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { deleteFile } from "./delete-file";
import { File } from "@/types";
import { deleteFileFromCloudinary } from "./delete-from-cloudinary";

export const deleteTask = actionClient
  .schema(DeleteTaskSchema)
  .action(async ({ parsedInput }) => {
    const { taskId } = parsedInput;

    try {
      const taskRef = db.collection("tasks").doc(taskId);
      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.exists) {
        return { error: "Task not found" };
      }

      await taskRef.delete();

      const batch = db.batch();

      const taskAttachments = await db
        .collection("tasks")
        .doc(taskId)
        .collection("files")
        .get();

      for (const attachmentDoc of taskAttachments.docs) {
        const attachment = attachmentDoc.data() as File;

        batch.delete(attachmentDoc.ref);

        await deleteFile({ public_id: attachment.public_id });
        await deleteFileFromCloudinary(attachment.public_id);
      }

      const taskAttachmentsRef = db
        .collection("tasks")
        .doc(taskId)
        .collection("files");
      const attachmentsSnapshot = await taskAttachmentsRef.get();
      const taskProjectRef = db
        .collection("tasks")
        .doc(taskId)
        .collection("project");
      const projectSnapshot = await taskProjectRef.get();

      for (const attachmentDoc of attachmentsSnapshot.docs) {
        batch.delete(attachmentDoc.ref);
      }

      for (const projectDoc of projectSnapshot.docs) {
        batch.delete(projectDoc.ref);
      }

      await batch.commit();

      revalidateTag("tasks");
      revalidateTag("files");

      return { success: "Task deleted successfully" };
    } catch (error) {
      console.error("Error deleting task: ", error);

      return { error };
    }
  });
