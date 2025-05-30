"use server";

import { CreateTaskSchema } from "@/schemas/CreateTaskSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";
import { revalidateTag } from "next/cache";
import { createNotif } from "./create-notif";
import { sendNotification } from "./send-notification";
import { getProjectById } from "@/lib/project";

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
      taskId,
      isEdit,
    } = parsedInput;
    const user = await getOptimisticUser();

    try {
      if (isEdit && taskId) {
        const existingTaskRef = db.collection("tasks").doc(taskId);
        const existingTaskSnapshot = await existingTaskRef.get();

        if (!existingTaskSnapshot.exists) {
          console.error("Error updating task: Task not found");

          return { error: "Task not found" };
        }

        await existingTaskRef.update({
          title,
          description,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          updatedAt: new Date().toISOString(),
          priority,
          status,
          assignees,
          projectId,
        });

        revalidateTag("tasks");
        revalidateTag("projects");

        return { success: "Task updated successfully" };
      }

      const { success: project, error: projectError } = await getProjectById(
        projectId
      );

      if (projectError || !project) {
        console.error("Error creating task: ", projectError);

        return { error: projectError };
      }

      const id = crypto.randomUUID();

      const taskRef = db.collection("tasks").doc(id);

      await taskRef.set({
        id,
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

      const userIds = assignees?.filter((id) => user.id !== id) || [];

      await createNotif({
        title: `New task: ${title}`,
        message: "New task assigned",
        senderId: user.id,
        type: "task",
        url: `/projects/${projectId}`,
        receiverIds: userIds,
      });
      await sendNotification({
        title: `New project: ${title}`,
        body: "New task assigned",
        userIds: userIds,
      });

      revalidateTag("tasks");
      revalidateTag("projects");

      return { success: "Successfully created task" };
    } catch (error) {
      console.error("Error creating task: ", error);

      return { error };
    }
  });
