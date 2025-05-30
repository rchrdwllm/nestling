"use server";

import { DeleteAttachmentSchema } from "@/schemas/DeleteAttachmentSchema";
import { actionClient } from "../action-client";
import { getFile } from "@/lib/file";
import { db } from "@/lib/firebase";
import {
  deleteFileFromCloudinary,
  deleteImgFromCloudinary,
} from "./delete-from-cloudinary";
import { revalidateTag } from "next/cache";

export const deleteAttachment = actionClient
  .schema(DeleteAttachmentSchema)
  .action(async ({ parsedInput }) => {
    const { taskId, attachmentId } = parsedInput;

    try {
      console.log({ attachmentId });
      const { success: fileData, error } = await getFile(attachmentId);

      if (error) {
        console.error(error);

        return { error };
      }

      if (!fileData) {
        return { error: "File not found" };
      }

      await db.collection("files").doc(attachmentId).delete();
      await db
        .collection("tasks")
        .doc(taskId)
        .collection("files")
        .doc(attachmentId)
        .delete();

      if (fileData.resource_type === "raw") {
        await deleteFileFromCloudinary(fileData.public_id);
      } else if (fileData.resource_type === "image") {
        await deleteImgFromCloudinary(fileData.public_id);
      }

      revalidateTag("files");
      revalidateTag("tasks");
      revalidateTag("projects");

      return { success: "File deleted" };
    } catch (error) {
      console.error("Error deleting attachment: ", error);

      return { error };
    }
  });
