import { getStudentAssignmentSubmission } from "@/lib/submission";
import SubmissionAttempt from "@/components/shared/courses-page/submissions/submission-attempt";
import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { getModuleContent } from "@/lib/content";
import { getFile, verifyFileIntegrity } from "@/lib/file";
import ErrorToast from "@/components/ui/error-toast";

type SubmissionPreviewProps = {
  studentId: string;
  contentId: string;
  attempt: string | undefined;
  submissionType: "file" | "text";
};

const SubmissionPreview = async ({
  studentId,
  contentId,
  attempt,
  submissionType,
}: SubmissionPreviewProps) => {
  const { success: studentSubmissions, error: studentSubmissionsError } =
    await getStudentAssignmentSubmission(contentId, studentId);
  const { success: content, error: contentError } = await getModuleContent(
    contentId
  );

  if (
    studentSubmissionsError ||
    contentError ||
    !studentSubmissions ||
    !content
  ) {
    return (
      <ErrorToast
        error={
          "Error fetching submissions or content" +
          (studentSubmissionsError || contentError)
        }
      />
    );
  }

  const selectedAttempt = attempt
    ? studentSubmissions[parseInt(attempt) - 1]
    : studentSubmissions[0];

  if (submissionType === "file") {
    const { success: file, error: fileError } = await getFile(
      selectedAttempt.fileId
    );

    if (fileError || !file) {
      return <ErrorToast error={fileError} />;
    }

    const isVerified = await verifyFileIntegrity(file.secure_url, file.hash);

    return (
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          {content.maxAttempts! > 0 && studentSubmissions.length > 1
            ? studentSubmissions.map((submission, index) => (
                <SubmissionAttempt
                  key={submission.id}
                  index={index}
                  indexLabel={studentSubmissions.length - index - 1}
                  isLatest={index === 0}
                />
              ))
            : null}
        </div>
        {isVerified ? (
          <div className="mt-6 p-6 border border-border rounded-xl">
            <PdfViewer pdfUrl={selectedAttempt.secureUrl} />
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-950 mt-8 p-6 border border-border rounded-xl text-red-800 dark:text-red-400">
            <p>This file may have been tampered with</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2">
        {content.maxAttempts! > 0 && studentSubmissions.length > 1
          ? studentSubmissions.map((submission, index) => (
              <SubmissionAttempt
                key={submission.id}
                index={index}
                indexLabel={studentSubmissions.length - index - 1}
                isLatest={index === 0}
              />
            ))
          : null}
      </div>
      <div className="mt-6 p-6 border border-border rounded-xl">
        <div
          className="flex flex-col gap-4"
          dangerouslySetInnerHTML={{ __html: selectedAttempt.content }}
        />
      </div>
    </div>
  );
};

export default SubmissionPreview;
