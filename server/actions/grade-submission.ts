"use server";

import { GradeSubmissionSchema } from "@/schemas/GradeSubmissionSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath, revalidateTag } from "next/cache";
import { logUserActivity } from "./log-user-activity";
import { getOptimisticUser } from "@/lib/user";
import { Submission } from "@/types";
import { createNotif } from "./create-notif";
import { getModuleContent } from "@/lib/content";
import { sendNotification } from "./send-notification";

export const gradeSubmission = actionClient
  .schema(GradeSubmissionSchema)
  .action(async ({ parsedInput }) => {
    const { grade, feedback, submissionId, regrade } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const submission = db.collection("submissions").doc(submissionId);
      const submissionRef = await submission.get();

      if (!submissionRef.exists) {
        return { error: "Submission not found" };
      }

      const submissionData = submissionRef.data() as Submission;

      await submission.update({
        grade: parseInt(grade),
        feedback: feedback || "",
        isGraded: true,
        gradedAt: new Date().toISOString(),
      });

      await logUserActivity({
        type: "grade_submission",
        userId: user.id,
        targetId: submissionId,
        details: {
          grade: parseInt(grade),
          feedback: feedback || "",
          contentId: submissionData.contentId,
          studentId: submissionData.studentId,
        },
      });

      const { success: content, error: contentError } = await getModuleContent(
        submissionData.contentId
      );

      if (contentError) {
        console.error("Error fetching content:", contentError);

        return { error: contentError };
      }

      if (!content) {
        return { error: "Failed to fetch content: Content not found" };
      }

      await createNotif({
        type: "submission_graded",
        message: `Your submission for ${content.title} has been graded.`,
        senderId: user.id,
        title: "Submission Graded",
        url: `/courses/${content.courseId}/modules/content/${content.id}/submissions`,
        receiverIds: [submissionData.studentId],
      });
      await sendNotification({
        body: `Your submission for ${content.title} has been graded.`,
        title: "Submission Graded",
        userIds: [submissionData.studentId],
      });

      revalidatePath(
        "/courses/[courseId]/modules/content/[contentId]/submissions",
        "page"
      );
      revalidatePath(
        "/courses/[courseId]/modules/content/[contentId]/page",
        "page"
      );
      revalidateTag("submissions");

      if (regrade) {
        return { success: "Assessment regraded" };
      }

      return { success: "Assessment graded" };
    } catch (error) {
      console.error(error);

      return { error };
    }
  });
