import { getStudentAssignmentSubmission } from "@/lib/submission";
import SubmissionAttempt from "./submission-attempt";
import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { getModuleContent } from "@/lib/content";

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

  if (studentSubmissionsError || contentError) {
    return <div>{studentSubmissionsError}</div>;
  }

  if (!studentSubmissions || !content) {
    return <div>Loading...</div>;
  }

  const selectedAttempt = attempt
    ? studentSubmissions[parseInt(attempt) - 1]
    : studentSubmissions[0];

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2">
        {content.maxAttempts! > 0 && studentSubmissions.length > 1
          ? studentSubmissions.map((submission, index) => (
              <SubmissionAttempt key={submission.id} index={index} />
            ))
          : null}
      </div>
      <div className="p-6 border border-border rounded-xl mt-6">
        {submissionType === "text" ? (
          <div
            className="flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: selectedAttempt.content }}
          />
        ) : (
          <PdfViewer pdfUrl={selectedAttempt.secureUrl} />
        )}
      </div>
    </div>
  );
};

export default SubmissionPreview;

// import PdfViewer from "@/components/shared/content-page/pdf-viewer";
// import { getFile } from "@/lib/file";
// import { File, Submission } from "@/types";
// import { useEffect, useState } from "react";

// type SubmissionPreviewProps = {
//   submission: Submission | null;
//   submissionType: "file" | "text";
// };

// const SubmissionPreview = ({
//   submission,
//   submissionType,
// }: SubmissionPreviewProps) => {
//   const [file, setFile] = useState<File | null>(null);

//   const fetchSubmissionFile = async () => {
//     if (submission) {
//       const { success: file, error } = await getFile(submission.fileId);
//       if (file) {
//         setFile(file);
//       } else {
//         console.error("Failed to fetch submission file:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (submission && submissionType === "file") {
//       fetchSubmissionFile();
//     }
//   }, [submission]);

//   if (!submission) {
//     return <div>Loading...</div>;
//   }

//   return (

//   );
// };

// export default SubmissionPreview;
