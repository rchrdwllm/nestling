"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Task } from "@/types";

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
