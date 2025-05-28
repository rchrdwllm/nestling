"use server";

import { CreateTaskSchema } from "@/schemas/CreateTaskSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";
import { revalidateTag } from "next/cache";

export const createTask = actionClient
  .schema(CreateTaskSchema)
  .action(async ({ parsedInput }) => {
    const {
      title,
      description,
      startDate,
      endDate,
      priority,
      status,
      assignees,
      projectId,
    } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const id = crypto.randomUUID();

      const taskRef = db.collection("tasks").doc(id);

      await taskRef.set({
        title,
        description,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: user.id,
        priority,
        status,
        assignees,
        projectId,
      });

      const reference = {
        taskId: id,
        createdAt: new Date().toISOString(),
        projectId,
      };

      const taskProjectRef = db
        .collection("tasks")
        .doc(id)
        .collection("project")
        .doc(projectId);
      const projectTaskRef = db
        .collection("projects")
        .doc(projectId)
        .collection("tasks")
        .doc(id);

      const batch = db.batch();

      batch.set(taskProjectRef, reference);
      batch.set(projectTaskRef, reference);

      await batch.commit();

      revalidateTag("tasks");
      revalidateTag("projects");

      return { success: "Successfully created task" };
    } catch (error) {
      console.error("Error creating task: ", error);

      return { error };
    }
  });
