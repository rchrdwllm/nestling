"use server";

import { LogUserActivitySchema } from "@/schemas/LogUserActivitySchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";

export const logUserActivity = actionClient
  .schema(LogUserActivitySchema)
  .action(async ({ parsedInput }) => {
    const { userId, type, details, targetId } = parsedInput;

    try {
      const id = crypto.randomUUID();
      const activitiesRef = db.collection("userActivities").doc(id);
      await activitiesRef.set({
        id,
        userId,
        type,
        targetId: targetId || null,
        createdAt: new Date().toISOString(),
        details: details || null,
      });

      return { success: "Activity logged successfully" };
    } catch (error) {
      console.error("Error logging user activity:", error);
      return { error: JSON.stringify(error) };
    }
  });
