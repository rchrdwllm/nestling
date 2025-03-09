"use server";

import { GradeSubmissionSchema } from "@/schemas/GradeSubmissionSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

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
        feedback,
        isGraded: true,
      });

      revalidatePath(
        "/(instructor)/instructor-courses/[courseId]/modules/content/[contentId]/submissions",
        "page"
      );
      revalidatePath(
        "/(student)/student-courses/[courseId]/modules/content/[contentId]/page",
        "page"
      );

      if (regrade) {
        return { success: "Assessment regraded" };
      }

      return { success: "Assessment graded" };
    } catch (error) {
      console.error(error);

      return { error };
    }
  });
