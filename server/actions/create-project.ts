"use server";

import { CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { getOptimisticUser } from "@/lib/user";
import { createNotif } from "./create-notif";
import { sendNotification } from "./send-notification";

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
      priority,
      projectHeads,
      projectAssociates,
      isEdit,
      projectId,
    } = parsedInput;

    try {
      if (isEdit && projectId) {
        const projectRef = db.collection("projects").doc(projectId);

        await projectRef.update({
          title,
          description,
          endDate: new Date(endDate).toISOString(),
          startDate: new Date(startDate).toISOString(),
          status,
          priority,
          projectHeads,
          projectAssociates,
          updatedAt: new Date().toISOString(),
        });

        revalidateTag("projects");

        return { success: { id: projectId } };
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
        priority,
        projectHeads,
        projectAssociates,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isArchived: false,
        archivedAt: null,
        ownerId: user.id,
      });

      const uniqueUserIds = Array.from(
        new Set([...(projectHeads ?? []), ...(projectAssociates ?? [])])
      ).filter((id) => user.id !== id);

      if (uniqueUserIds.length > 0) {
        await createNotif({
          title: `New project: ${title}`,
          message: "You're part of a new project!",
          senderId: user.id,
          type: "project",
          url: `/projects/${id}`,
          receiverIds: uniqueUserIds,
        });

        await sendNotification({
          title: `New project: ${title}`,
          body: "You're part of a new project!",
          userIds: uniqueUserIds,
        });
      }

      revalidateTag("projects");

      return { success: { id } };
    } catch (error) {
      console.error("Error creating project:", error);

      return { error: JSON.stringify(error) };
    }
  });
