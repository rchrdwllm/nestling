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

export const getInstructorProjects = unstable_cache(
  async (instructorId: string) => {
    try {
      const projectsSnapshot = await db
        .collection("projects")
        .where("projectAssociates", "array-contains", instructorId)
        .get();
      const projects = projectsSnapshot.docs.map((doc) =>
        doc.data()
      ) as Project[];

      return { success: projects };
    } catch (error) {
      console.error("Error fetching instructor projects:", error);

      return { error: "Failed to fetch instructor projects" };
    }
  },
  ["instructorId"],
  { revalidate: 60 * 60, tags: ["projects"] }
);

export const getProjectById = unstable_cache(
  async (projectId: string) => {
    try {
      const projectDoc = await db.collection("projects").doc(projectId).get();

      if (!projectDoc.exists) {
        return { error: "Project not found" };
      }

      const project = projectDoc.data() as Project;

      return { success: project };
    } catch (error) {
      console.error("Error fetching project:", error);
      return { error: "Failed to fetch project" };
    }
  },
  ["projectId"],
  { revalidate: 60 * 60, tags: ["projects"] }
);
