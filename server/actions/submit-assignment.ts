"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { UploadFileSchema } from "@/schemas/UploadFileSchema";
import { getOptimisticUser } from "@/lib/user";
import { uploadFile } from "./upload-file";
import { SubmitAssignmentSchema } from "@/schemas/SubmitAssignmentSchema";
import * as z from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { Content } from "@/types";
import { logUserActivity } from "./log-user-activity";

export const submitAssignment = actionClient
  .schema(SubmitAssignmentSchema)
  .schema(async (prevSchema) => {
    return prevSchema.extend({
      file: z.optional(UploadFileSchema),
    });
  })
  .action(async ({ parsedInput }) => {
    const { content, contentId, file } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const batch = db.batch();
      const submissionId = crypto.randomUUID();
      const submissionRef = db.collection("submissions").doc(submissionId);
      const contentObj = await db.collection("contents").doc(contentId).get();
      const { courseId } = contentObj.data() as Content;

      const contentSubmissionRef = db
        .collection("contents")
        .doc(contentId)
        .collection("submissions")
        .doc(submissionId);

      if (file) {
        const {
          asset_id,
          content_id,
          created_at,
          public_id,
          secure_url,
          type,
          url,
          resource_type,
          hash,
          original_filename,
        } = file;

        const newFileSubmission = {
          studentId: user.id,
          studentName: user.name,
          type,
          contentId: content_id,
          fileId: public_id,
          id: submissionId,
          createdAt: new Date().toISOString(),
          secureUrl: secure_url,
          isGraded: false,
          grade: null,
        };

        const reference = {
          submissionId,
          createdAt: new Date().toISOString(),
          fileId: public_id,
          secureUrl: secure_url,
          contentId: content_id,
          studentId: user.id,
        };

        try {
          await uploadFile({
            asset_id,
            content_id,
            created_at,
            public_id,
            secure_url,
            type,
            url,
            submission_id: submissionId,
            resource_type,
            hash,
            original_filename,
          });

          batch.set(submissionRef, newFileSubmission);
          batch.set(contentSubmissionRef, reference);

          await batch.commit();

          revalidatePath(
            "/courses/[courseId]/modules/content/[contentId]",
            "page"
          );
          revalidatePath(`/courses/${courseId}/modules/content/${contentId}`);
          revalidateTag("submissions");

          return { success: "Assignment submitted successfully" };
        } catch (error) {
          console.error("File upload failed:", error);

          return { error: JSON.stringify(error) };
        }
      }

      const newSubmission = {
        studentId: user.id,
        studentName: user.name,
        content,
        id: submissionId,
        contentId,
        createdAt: Date.now(),
        isGraded: false,
        grade: null,
      };

      batch.set(submissionRef, newSubmission);
      batch.set(contentSubmissionRef, {
        submissionId,
        createdAt: newSubmission.createdAt,
        contentId,
        studentId: user.id,
      });

      await batch.commit();

      await logUserActivity({
        type: "submit_assignment",
        userId: user.id,
        targetId: contentId,
        details: {
          submissionId,
          courseId,
          contentId,
        },
      });

      revalidatePath("/courses/[courseId]/modules/content/[contentId]", "page");
      revalidatePath(`/courses/${courseId}/modules/content/${contentId}`);
      revalidateTag("submissions");

      return { success: "Assignment submitted successfully" };
    } catch (error) {
      console.error("Assignment submission failed:", error);

      return { error: JSON.stringify(error) };
    }
  });
