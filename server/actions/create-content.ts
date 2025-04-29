"use server";

import { CreateContentSchema } from "@/schemas/CreateContentSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath, revalidateTag } from "next/cache";
import { createNotif } from "./create-notif";
import { getOptimisticUser } from "@/lib/user";
import { getEnrolledStudentIds } from "@/lib/course";

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
    } = parsedInput;
    const user = await getOptimisticUser();

    if (isEdit) {
      if (type === "assignment") {
        await db.collection("contents").doc(id).update({
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
          updatedAt: new Date().toISOString(),
        });

        revalidatePath(
          "/(instructor)/instructor-courses/[courseId]/modules/content/[contentId]",
          "page"
        );
        revalidateTag("contents");
        revalidateTag("modules");
        revalidateTag("module");

        return { success: parsedInput };
      }

      if (type === "lesson") {
        await db.collection("contents").doc(id).update({
          title,
          type,
          moduleId,
          courseId,
          content,
          id,
          isPublished,
          updatedAt: new Date().toISOString(),
        });

        revalidatePath(
          "/(instructor)/instructor-courses/[courseId]/modules/content/[contentId]",
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
              title,
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
              title,
              type,
              moduleId,
              id,
              courseId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              startDate: date?.from.toISOString(),
              endDate: date?.to.toISOString(),
              submissionType,
              points,
              maxAttempts,
              isLocked: false,
              content,
              isPublished,
            }
          : {
              title,
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

      revalidatePath("/(instructor)/instructor-courses/[courseId]", "page");
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
          title: `New assignment: ${title}`,
          message: `A new assignment has been created!`,
          senderId: user.id,
          type: "assignment",
          url: `/student-courses/${courseId}/modules/content/${id}`,
          receiverIds: enrolledStudentIds,
        });
      }

      return { success: newContent };
    } catch (error) {
      return { error };
    }
  });
