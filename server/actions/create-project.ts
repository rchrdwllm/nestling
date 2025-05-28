"use server";

import { CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { getOptimisticUser } from "@/lib/user";

export const createProject = actionClient
  .schema(CreateProjectSchema)
  .action(async ({ parsedInput }) => {
    const user = await getOptimisticUser();
    const {
      title,
      description,
      endDate,
      startDate,
      status,
      projectHeads,
      projectAssociates,
      isEdit,
      projectId,
    } = parsedInput;

    try {
      if (isEdit && projectId) {
        const projectRef = db.collection("projects").doc(projectId);

        console.log({ parsedInput });

        await projectRef.update({
          title,
          description,
          endDate: new Date(endDate).toISOString(),
          startDate: new Date(startDate).toISOString(),
          status,
          projectHeads,
          projectAssociates,
          updatedAt: new Date().toISOString(),
        });

        revalidateTag("projects");

        return { success: "Project updated successfully" };
      }

      const id = crypto.randomUUID();

      const projectRef = db.collection("projects").doc(id);

      await projectRef.set({
        id,
        title,
        description,
        endDate: new Date(endDate).toISOString(),
        startDate: new Date(startDate).toISOString(),
        status,
        projectHeads,
        projectAssociates,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isArchived: false,
        archivedAt: null,
        ownerId: user.id,
      });

      revalidateTag("projects");

      return { success: "Project created successfully" };
    } catch (error) {
      console.error("Error creating project:", error);

      return { error };
    }
  });
