"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { DeleteImageSchema } from "@/schemas/DeleteImageSchema";
import { getImage } from "@/lib/image";

export const deleteImage = actionClient
  .schema(DeleteImageSchema)
  .action(async ({ parsedInput }) => {
    const { public_id } = parsedInput;

    try {
      const { success: imageData, error } = await getImage(public_id);

      if (error) {
        console.error(error);

        return { error };
      }

      if (!imageData) {
        return { error: "Image not found" };
      }

      await db.collection("images").doc(public_id).delete();
      await db
        .collection("contents")
        .doc(imageData.content_id)
        .collection("images")
        .doc(public_id)
        .delete();

      return { success: "Image deleted" };
    } catch (error) {
      console.error("Image deletion failed:", error);

      return { error };
    }
  });
