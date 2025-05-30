"use server";

import { AddAttachmentSchema } from "@/schemas/AddAttachmentSchema";
import { actionClient } from "../action-client";
import { uploadFile } from "./upload-file";
import { revalidateTag } from "next/cache";

export const addAttachment = actionClient
  .schema(AddAttachmentSchema)
  .action(async ({ parsedInput }) => {
    const { files, taskId } = parsedInput;

    try {
      files.forEach(async (file) => {
        if (!file) {
          return { error: "Error uploading a file" };
        }

        await uploadFile({
          ...file,
          task_id: taskId,
        });
      });

      revalidateTag("projects");
      revalidateTag("tasks");

      return { success: "Attachments added!" };
    } catch (error) {
      console.error("Error adding attachment: ", error);

      return { error };
    }
  });
