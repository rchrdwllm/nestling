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
