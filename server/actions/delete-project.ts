"use server";

import { DeleteProjectSchema } from "@/schemas/DeleteProjectSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { deleteTask } from "./delete-task";

export const deleteProject = actionClient
  .schema(DeleteProjectSchema)
  .action(async ({ parsedInput }) => {
    const { projectId } = parsedInput;

    try {
      const projectRef = db.collection("projects").doc(projectId);
      const projectSnapshot = await projectRef.get();

      if (!projectSnapshot.exists) {
        return { error: "Project not found" };
      }

      await projectRef.delete();

      const batch = db.batch();

      const projectTasks = await db
        .collection("tasks")
        .where("projectId", "==", projectId)
        .get();

      for (const taskDoc of projectTasks.docs) {
        const taskId = taskDoc.id;

        await deleteTask({ taskId });
      }

      const projectTasksRef = db
        .collection("projects")
        .doc(projectId)
        .collection("tasks");
      const tasksSnapshot = await projectTasksRef.get();

      for (const taskDoc of tasksSnapshot.docs) {
        batch.delete(taskDoc.ref);
      }

      await batch.commit();

      revalidateTag("projects");
      revalidateTag("tasks");

      return { success: "Project deleted successfully" };
    } catch (error) {
      console.error("Error deleting project: ", error);

      return { error };
    }
  });
