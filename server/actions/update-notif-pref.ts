"use server";

import { UpdateNotifPrefSchema } from "@/schemas/UpdateNotifPrefSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { User } from "@/types";
import { revalidateTag } from "next/cache";

export const updateNotifPref = actionClient
  .schema(UpdateNotifPrefSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = parsedInput;

    try {
      const existingUser = await db.collection("users").doc(userId).get();

      if (!existingUser.exists) {
        return { error: "User not found" };
      }

      const userData = existingUser.data() as User;
      const currentlyEnabled = userData.notifsEnabled;

      await db.collection("users").doc(userId).update({
        notifsEnabled: !currentlyEnabled,
      });

      revalidateTag("user");

      return {
        success: `Notifications ${currentlyEnabled ? "disabled" : "enabled"}`,
      };
    } catch (error) {
      console.error("Error updating notification preference:", error);
      return { error: JSON.stringify(error) };
    }
  });
