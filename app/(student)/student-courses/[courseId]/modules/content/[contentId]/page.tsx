import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import SubmitAssignmentBtn from "@/components/student-access/courses-page/assignment-content/submit-assignment-btn";
import AssignmentDetails from "@/components/student-access/courses-page/assignment-content/assignment-details";
import { getContentFile, getModuleContent } from "@/lib/content";
import { getStudentAssignmentSubmission } from "@/lib/submission";
import { getOptimisticUser } from "@/lib/user";

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

  if (contentError) {
    return <div>{contentError}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  const file = content.type === "file" ? await getContentFile(contentId) : null;
  const { success: submissions } =
    content.type === "assignment"
      ? await getStudentAssignmentSubmission(contentId, user.id)
      : { success: null };

  return (
    <main className="p-6">
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
    </main>
  );
};

export default ContentPage;
