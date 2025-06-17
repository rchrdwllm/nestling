"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Task } from "@/types";
import { getFile } from "./file";

export const getIncompleteTasks = unstable_cache(
  async () => {
    try {
      const incompleteProjectsSnapshot = await db
        .collection("projects")
        .where("isArchived", "==", false)
        .where("status", "!=", "completed")
        .get();

      if (incompleteProjectsSnapshot.empty) {
        return { success: [] };
      }

      const incompleteProjectIds = incompleteProjectsSnapshot.docs.map(
        (doc) => doc.id
      );
      const tasksSnapshot = await db
        .collection("tasks")
        .where("projectId", "in", incompleteProjectIds)
        .where("isArchived", "==", false)
        .where("status", "!=", "completed")
        .get();
      const tasks = tasksSnapshot.docs.map((doc) => doc.data()) as Task[];

      return { success: tasks };
    } catch (error) {
      console.error("Error fetching all tasks:", error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allTasks"],
  { revalidate: 60 * 60, tags: ["tasks"] }
);

export const getProjectTasks = unstable_cache(
  async (projectId: string) => {
    try {
      const tasksSnapshot = await db
        .collection("tasks")
        .where("projectId", "==", projectId)
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
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

export const getArchivedProjectTasks = unstable_cache(
  async (projectId: string) => {
    try {
      const tasksSnapshot = await db
        .collection("tasks")
        .where("projectId", "==", projectId)
        .where("isArchived", "==", true)
        .orderBy("createdAt", "desc")
        .get();
      const tasks = tasksSnapshot.docs.map((doc) => doc.data()) as Task[];

      return { success: tasks };
    } catch (error) {
      console.error("Error fetching archived project tasks:", error);
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
        .orderBy("createdAt", "desc")
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
        .orderBy("createdAt", "desc")
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
        .orderBy("createdAt", "desc")
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

export const getTask = unstable_cache(
  async (taskId: string) => {
    try {
      const taskSnapshot = await db.collection("tasks").doc(taskId).get();

      if (!taskSnapshot.exists) {
        return { error: "Task not found" };
      }

      const taskData = taskSnapshot.data() as Task;

      return { success: taskData };
    } catch (error) {
      console.error("Error fetching task:", error);

      return { error };
    }
  },
  ["taskId"],
  {
    revalidate: 60 * 60,
    tags: ["tasks"],
  }
);
