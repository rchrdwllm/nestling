"use server";

import { GradeSubmissionSchema } from "@/schemas/GradeSubmissionSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath, revalidateTag } from "next/cache";

export const gradeSubmission = actionClient
  .schema(GradeSubmissionSchema)
  .action(async ({ parsedInput }) => {
    const { grade, feedback, submissionId, regrade } = parsedInput;

    try {
      const submission = db.collection("submissions").doc(submissionId);
      const submissionRef = await submission.get();

      if (!submissionRef.exists) {
        return { error: "Submission not found" };
      }

      await submission.update({
        grade: parseInt(grade),
        feedback: feedback || "",
        isGraded: true,
        gradedAt: new Date().toISOString(),
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
