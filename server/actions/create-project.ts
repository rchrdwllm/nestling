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

    try {
      const id = crypto.randomUUID();

      const projectRef = db.collection("projects").doc(id);

      await projectRef.set({
        ...parsedInput,
        id,
        startDate: new Date(parsedInput.startDate).toISOString(),
        endDate: new Date(parsedInput.endDate).toISOString(),
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
