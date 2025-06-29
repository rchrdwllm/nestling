"use server";

import { CreateContentSchema } from "@/schemas/CreateContentSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath, revalidateTag } from "next/cache";
import { createNotif } from "./create-notif";
import { getOptimisticUser } from "@/lib/user";
import { getEnrolledStudentIds } from "@/lib/course";
import { sendNotification } from "./send-notification";

export const createContent = actionClient
  .schema(CreateContentSchema)
  .action(async ({ parsedInput }) => {
    const {
      title,
      type,
      moduleId,
      courseId,
      content,
      date,
      submissionType,
      points,
      maxAttempts,
      id,
      isPublished,
      isEdit,
      isGraded,
    } = parsedInput;
    const user = await getOptimisticUser();

    if (isEdit) {
      if (type === "assignment") {
        await db
          .collection("contents")
          .doc(id)
          .update({
            title: title || "Untitled content",
            type,
            moduleId,
            courseId,
            content,
            startDate: date?.from?.toISOString(),
            endDate: date?.to?.toISOString(),
            submissionType,
            points: isGraded ? points : null,
            maxAttempts,
            id,
            isPublished,
            updatedAt: new Date().toISOString(),
            isGraded,
          });

        revalidatePath(
          "/courses/[courseId]/modules/content/[contentId]",
          "page"
        );
        revalidateTag("contents");
        revalidateTag("modules");
        revalidateTag("module");
        revalidateTag("assignments");

        return { success: parsedInput };
      }

      if (type === "lesson") {
        await db
          .collection("contents")
          .doc(id)
          .update({
            title: title || "Untitled content",
            type,
            moduleId,
            courseId,
            content,
            id,
            isPublished,
            updatedAt: new Date().toISOString(),
          });

        revalidatePath(
          "/courses/[courseId]/modules/content/[contentId]",
          "page"
        );
        revalidateTag("contents");
        revalidateTag("modules");
        revalidateTag("module");

        return { success: parsedInput };
      }
    }

    try {
      const newContent =
        type === "lesson"
          ? {
              title: title || "Untitled content",
              type,
              moduleId,
              id,
              courseId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              content,
              isLocked: false,
              isPublished,
            }
          : type === "assignment"
          ? {
              title: title || "Untitled content",
              type,
              moduleId,
              id,
              courseId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              startDate: date?.from?.toISOString(),
              endDate: date?.to?.toISOString(),
              submissionType: submissionType,
              points: isGraded ? points : null,
              maxAttempts: maxAttempts,
              isLocked: false,
              content,
              isPublished,
              isGraded,
            }
          : {
              title: title || "Untitled content",
              type,
              moduleId,
              id,
              courseId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              content,
              isLocked: false,
              isPublished,
            };

      await db.collection("contents").doc(id).set(newContent);

      const batch = db.batch();

      const moduleContentRef = db
        .collection("modules")
        .doc(moduleId)
        .collection("contents")
        .doc(id);
      const contentModuleRef = db
        .collection("contents")
        .doc(id)
        .collection("modules")
        .doc(moduleId);

      const reference = {
        moduleId: moduleId,
        contentId: id,
        createdAt: new Date().toISOString(),
      };

      batch.set(moduleContentRef, reference);
      batch.set(contentModuleRef, reference);

      await batch.commit();

      revalidatePath("/courses/[courseId]", "page");
      revalidateTag("contents");
      revalidateTag("modules");
      revalidateTag("module");

      if (type === "assignment") {
        const { success: enrolledStudentIds, error } =
          await getEnrolledStudentIds(courseId);

        if (error) {
          console.error("Error fetching enrolled student IDs:", error);

          return { error };
        }

        await createNotif({
          title: `New assignment: ${title || "Untitled content"}`,
          message: `A new assignment has been created!`,
          senderId: user.id,
          type: "assignment",
          url: `/courses/${courseId}/modules/content/${id}`,
          receiverIds: enrolledStudentIds,
        });
        await sendNotification({
          title: `New assignment: ${title || "Untitled content"}`,
          body: "A new assignment has been created!",
          userIds: enrolledStudentIds ?? [],
        });

        revalidateTag("assignments");
      }

      return { success: newContent };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });
