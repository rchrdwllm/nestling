"use server";

import { LogUserActivitySchema } from "@/schemas/LogUserActivitySchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const logUserActivity = actionClient
  .schema(LogUserActivitySchema)
  .action(async ({ parsedInput }) => {
    const { userId, type } = parsedInput;

    try {
      const id = crypto.randomUUID();
      const activitiesRef = db.collection("userActivities").doc(id);

      await activitiesRef.set({
        id,
        userId,
        type,
        createdAt: new Date().toISOString(),
      });

      revalidateTag("userActivities");

      return { success: "Activity logged successfully" };
    } catch (error) {
      console.error("Error logging user activity:", error);

      return { error };
    }
  });
