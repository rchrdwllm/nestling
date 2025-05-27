"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Project } from "@/types";

export const getProjects = unstable_cache(
  async () => {
    try {
      const projectsSnapshot = await db.collection("projects").get();

      const projects = projectsSnapshot.docs.map((doc) =>
        doc.data()
      ) as Project[];

      return { success: projects };
    } catch (error) {
      console.error("Error fetching projects:", error);

      return { error: "Failed to fetch projects" };
    }
  },
  ["allProjects"],
  { revalidate: 60 * 60, tags: ["projects"] }
);
