"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Task } from "@/types";
import { getFile } from "./file";

export const getProjectTasks = unstable_cache(
  async (projectId: string) => {
    try {
      const tasksSnapshot = await db
        .collection("tasks")
        .where("projectId", "==", projectId)
        .get();
      const tasks = tasksSnapshot.docs.map((doc) => doc.data()) as Task[];

      return { success: tasks };
    } catch (error) {
      console.error("Error fetching project tasks:", error);

      return { error };
    }
  },
  ["projectId"],
  { revalidate: 60 * 60, tags: ["tasks"] }
);

export const getUserTasks = unstable_cache(
  async (userId: string) => {
    try {
      const employeeTasks = await db
        .collection("tasks")
        .where("assignees", "array-contains", userId)
        .get();
      const tasks = employeeTasks.docs.map((doc) => doc.data()) as Task[];

      return { success: tasks };
    } catch (error) {
      console.error("Error fetching project tasks:", error);

      return { error };
    }
  },
  ["userId"],
  { revalidate: 60 * 60, tags: ["tasks"] }
);

export const getIncompleteUserTasks = unstable_cache(
  async (userId: string) => {
    try {
      const employeeTasks = await db
        .collection("tasks")
        .where("assignees", "array-contains", userId)
        .where("status", "!=", "completed")
        .get();
      const tasks = employeeTasks.docs.map((doc) => doc.data()) as Task[];

      return { success: tasks };
    } catch (error) {
      console.error("Error fetching project tasks:", error);

      return { error };
    }
  },
  ["userId"],
  { revalidate: 60 * 60, tags: ["tasks"] }
);

export const getTaskAttachments = unstable_cache(
  async (taskId: string) => {
    try {
      const taskAttachmentsSnapshot = await db
        .collection("tasks")
        .doc(taskId)
        .collection("files")
        .get();
      const taskAttachmentIds = taskAttachmentsSnapshot.docs.map(
        (doc) => doc.id
      );
      const taskAttachments = await Promise.all(
        taskAttachmentIds.map(async (id) => {
          const { success, error } = await getFile(id);

          return success!;
        })
      );

      return { success: taskAttachments };
    } catch (error) {
      console.error("Error fetching task attachments: ", error);

      return { error };
    }
  },
  ["taskId"],
  { revalidate: 60 * 60, tags: ["tasks"] }
);
