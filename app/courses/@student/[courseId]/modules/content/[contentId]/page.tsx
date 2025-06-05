import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import SubmitAssignmentBtn from "@/components/student-access/courses-page/assignment-content/submit-assignment-btn";
import AssignmentDetails from "@/components/student-access/courses-page/assignment-content/assignment-details";
import { getContentFile, getModuleContent } from "@/lib/content";
import { getStudentAssignmentSubmission } from "@/lib/submission";
import { getOptimisticUser } from "@/lib/user";
import StudentSubmission from "@/components/student-access/courses-page/student-submission";
import ContentViewLogger from "@/components/shared/content-page/content-view-logger";
import ErrorToast from "@/components/ui/error-toast";

const ContentPage = async ({
  params,
}: {
  params: Promise<{ contentId: string }>;
}) => {
  const { contentId } = await params;
  const { success: content, error: contentError } = await getModuleContent(
    contentId
  );
  const user = await getOptimisticUser();

  if (contentError || !content) {
    return <ErrorToast error={"Error fetching content: " + contentError} />;
  }

  const file = content.type === "file" ? await getContentFile(contentId) : null;
  const { success: submissions } =
    content.type === "assignment"
      ? await getStudentAssignmentSubmission(contentId, user.id)
      : { success: null };

  const startDate =
    content.type === "assignment" ? new Date(content.startDate!) : new Date();
  const endDate =
    content.type === "assignment" ? new Date(content.endDate!) : new Date();
  const currentDate = content.type === "assignment" ? new Date() : new Date();

  const isLocked = currentDate < startDate || currentDate > endDate || false;

  if (isLocked) {
    return (
      <div className="flex gap-8 p-6">
        <ContentViewLogger content={content} />
        <div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">{content.title}</h1>
            <hr />
          </div>
          {content.type === "assignment" && (
            <AssignmentDetails
              {...content}
              submissionsLength={submissions!.length}
            />
          )}
          <p className="mt-4">
            This content is locked. Please check the start and end dates to see
            when it will be available.
          </p>
        </div>
        {submissions?.length ? (
          <StudentSubmission
            courseId={content.courseId}
            contentId={content.id}
          />
        ) : null}
      </div>
    );
  }

  return (
    <main className="p-6 flex gap-8">
      <ContentViewLogger content={content} />
      <div className="flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">{content.title}</h1>
            {content.type === "assignment" && (
              <SubmitAssignmentBtn
                submissionType={content.submissionType!}
                contentId={contentId}
                submissionsLength={submissions!.length}
                maxAttempts={content.maxAttempts}
              />
            )}
          </div>
          <hr />
        </div>
        {content.type === "assignment" && (
          <AssignmentDetails
            {...content}
            submissionsLength={submissions!.length}
          />
        )}
        <div
          className="flex flex-col gap-4 mt-6"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        {file && <PdfViewer pdfUrl={file.success?.secure_url!} />}
      </div>
      {submissions?.length ? (
        <StudentSubmission courseId={content.courseId} contentId={content.id} />
      ) : null}
    </main>
  );
};

export default ContentPage;
