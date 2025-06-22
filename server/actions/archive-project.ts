"use server";

import { ArchiveProjectSchema } from "@/schemas/ArchiveProjectSchema";
import { actionClient } from "../action-client";
import { getProjectById } from "@/lib/project";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const archiveProject = actionClient
  .schema(ArchiveProjectSchema)
  .action(async ({ parsedInput }) => {
    const { projectId } = parsedInput;

    try {
      const { success: project, error: projectError } = await getProjectById(
        projectId
      );

      if (projectError) {
        console.error("Error archiving project: ", projectError);

        return { projectError };
      }

      if (!project) {
        console.error("Error archiving project: Project not found");

        return { projectError };
      }

      const isArchived = project.isArchived;

      const projectRef = db.collection("projects").doc(projectId);

      await projectRef.update({
        isArchived: !isArchived,
      });

      revalidateTag("projects");

      return {
        success: `Project ${
          isArchived ? "unarchived" : "archived"
        } successfully`,
      };
    } catch (error) {
      console.error("Error archiving project: ", error);

      return { error: JSON.stringify(error) };
    }
  });
