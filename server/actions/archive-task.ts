"use server";

import { ArchiveTaskSchema } from "@/schemas/ArchiveTaskSchema";
import { actionClient } from "../action-client";
import { getTask } from "@/lib/task";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { Task } from "@/types";

export const archiveTask = actionClient
  .schema(ArchiveTaskSchema)
  .action(async ({ parsedInput }) => {
    const { taskId } = parsedInput;

    try {
      const taskRef = db.collection("tasks").doc(taskId);
      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.exists) {
        return { error: "Task not found" };
      }

      const task = taskSnapshot.data() as Task;

      const { isArchived } = task;

      await db
        .collection("tasks")
        .doc(taskId)
        .update({
          isArchived: !isArchived,
          archivedAt: !isArchived ? new Date().toISOString() : null,
        });

      revalidateTag("tasks");

      return {
        success: !isArchived
          ? "Task archived successfully"
          : "Task unarchived successfully",
      };
    } catch (error) {
      console.error("Error archiving task:", error);

      return { error: JSON.stringify(error) };
    }
  });
