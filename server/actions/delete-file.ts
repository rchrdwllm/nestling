"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { DeleteFileSchema } from "@/schemas/DeleteFileSchema";
import { getFile } from "@/lib/file";
import { revalidateTag } from "next/cache";

export const deleteFile = actionClient
  .schema(DeleteFileSchema)
  .action(async ({ parsedInput }) => {
    const { public_id, content_id } = parsedInput;

    try {
      const { success: fileData, error } = await getFile(public_id);

      console.log("Deleting file with public_id:", public_id);
      console.log("File data:", fileData);

      if (error) {
        console.error(error);

        return { error };
      }

      if (!fileData) {
        return { error: "File not found" };
      }

      if (content_id) {
        await db.collection("files").doc(public_id).delete();
        await db
          .collection("contents")
          .doc(content_id)
          .collection("files")
          .doc(public_id)
          .delete();
      }

      revalidateTag("files");

      return { success: "File deleted" };
    } catch (error) {
      console.error("File deletion failed:", error);

      return { error: JSON.stringify(error) };
    }
  });
