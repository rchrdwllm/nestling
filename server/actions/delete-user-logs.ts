"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { DeleteUserLogsSchema } from "@/schemas/DeleteUserLogsSchema";
import { revalidateTag } from "next/cache";

export const deleteUserLogs = actionClient
  .schema(DeleteUserLogsSchema)
  .action(async ({ parsedInput }) => {
    const { types } = parsedInput;

    try {
      const userActivitiesRef = db.collection("userActivities");
      const query = userActivitiesRef.where("type", "in", types);
      const snapshot = await query.get();
      const batch = db.batch();

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      revalidateTag("userActivities");

      return { success: "Logs deleted successfully" };
    } catch (error) {
      console.error("Error deleting user logs:", error);

      return { error };
    }
  });
