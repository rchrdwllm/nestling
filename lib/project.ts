"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Project } from "@/types";
import { getUserById } from "./user";

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

export const getProjectsOfUser = unstable_cache(
  async (userId: string) => {
    try {
      const associatesProjectsSnapshot = await db
        .collection("projects")
        .where("projectAssociates", "array-contains", userId)
        .where("isArchived", "==", false)
        .get();
      const headProjectsSnapshot = await db
        .collection("projects")
        .where("projectHeads", "array-contains", userId)
        .where("isArchived", "==", false)
        .get();

      const allDocs = [
        ...associatesProjectsSnapshot.docs,
        ...headProjectsSnapshot.docs,
      ];
      const uniqueDocs = Array.from(
        new Map(allDocs.map((doc) => [doc.id, doc])).values()
      );
      const projects = uniqueDocs.map((doc) => doc.data()) as Project[];

      return { success: projects };
    } catch (error) {
      console.error("Error fetching user projects:", error);
      return { error: "Failed to fetch user projects" };
    }
  },
  ["userId"],
  { revalidate: 60 * 60, tags: ["projects"] }
);

export const getArchivedUserProjects = unstable_cache(
  async (userId: string) => {
    try {
      const associatesProjectsSnapshot = await db
        .collection("projects")
        .where("projectAssociates", "array-contains", userId)
        .where("isArchived", "==", true)
        .get();
      const headProjectsSnapshot = await db
        .collection("projects")
        .where("projectHeads", "array-contains", userId)
        .where("isArchived", "==", true)
        .get();

      const allDocs = [
        ...associatesProjectsSnapshot.docs,
        ...headProjectsSnapshot.docs,
      ];
      const uniqueDocs = Array.from(
        new Map(allDocs.map((doc) => [doc.id, doc])).values()
      );
      const projects = uniqueDocs.map((doc) => doc.data()) as Project[];

      return { success: projects };
    } catch (error) {
      console.error("Error fetching archived projects: ", error);

      return { error: "Failed to fetch archived projects" };
    }
  },
  ["userId"],
  { revalidate: 60 * 60, tags: ["projects"] }
);

export const getProjectHeads = unstable_cache(
  async (projectId: string) => {
    try {
      const { success: project, error } = await getProjectById(projectId);

      if (error) {
        console.error("Error fetching project heads:", error);

        return { error };
      }

      if (!project) {
        console.error("Error fetching project heads:", error);

        return { error };
      }

      const projectHeadIds = project.projectHeads;
      const projectHeadsData = await Promise.all(
        projectHeadIds.map(async (headId) => {
          const { success: user, error } = await getUserById(headId);

          if (error) {
            console.error(error);
          }

          if (!user) {
            console.error(error);
          }

          return user!;
        })
      );

      return { success: projectHeadsData };
    } catch (error) {
      console.error("Error fetching project heads: ", error);

      return { error: "Failed to fetch project heads" };
    }
  },
  ["projectId"],
  { revalidate: 60 * 60, tags: ["projects", "user"] }
);

export const getProjectAssociates = unstable_cache(
  async (projectId: string) => {
    try {
      const { success: project, error } = await getProjectById(projectId);

      if (error) {
        console.error("Error fetching project heads:", error);

        return { error };
      }

      if (!project) {
        console.error("Error fetching project heads:", error);

        return { error };
      }

      const projectAssociateIds = project.projectAssociates;
      const projectAssociatesData = await Promise.all(
        projectAssociateIds.map(async (associateId) => {
          const { success: user, error } = await getUserById(associateId);

          if (error) {
            console.error(error);
          }

          if (!user) {
            console.error(error);
          }

          return user!;
        })
      );

      return { success: projectAssociatesData };
    } catch (error) {
      console.error("Error fetching project heads: ", error);

      return { error: "Failed to fetch project heads" };
    }
  },
  ["projectId"],
  { revalidate: 60 * 60, tags: ["projects", "user"] }
);
