"use server";

import { ArchiveUserSchema } from "@/schemas/ArchiveUserSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { User } from "@/types";
import { revalidateTag } from "next/cache";

export const archiveUser = actionClient
  .schema(ArchiveUserSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = parsedInput;

    try {
      const userRef = await db.collection("users").doc(userId).get();

      if (!userRef.exists) {
        console.error("User not found: ", userId);

        return { error: "User not found" };
      }

      const userData = userRef.data() as User;
      const isArchived = userData.isArchived || false;

      await db
        .collection("users")
        .doc(userId)
        .update({
          isArchived: !isArchived,
          archivedAt: !isArchived ? new Date().toISOString() : null,
        });

      revalidateTag("user");

      return {
        success: isArchived
          ? "User unarchived successfully"
          : "User archived successfully",
      };
    } catch (error) {
      console.error("Error fetching user:", error);

      return { error };
    }
  });
