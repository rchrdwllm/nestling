import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { getFile } from "@/lib/file";
import { File, Submission } from "@/types";
import { useEffect, useState } from "react";

type SubmissionPreviewProps = {
  submission: Submission | null;
  submissionType: "file" | "text";
};

const SubmissionPreview = ({
  submission,
  submissionType,
}: SubmissionPreviewProps) => {
  const [file, setFile] = useState<File | null>(null);

  const fetchSubmissionFile = async () => {
    if (submission) {
      const { success: file, error } = await getFile(submission.fileId);
      if (file) {
        setFile(file);
      } else {
        console.error("Failed to fetch submission file:", error);
      }
    }
  };

  useEffect(() => {
    if (submission && submissionType === "file") {
      fetchSubmissionFile();
    }
  }, [submission]);

  if (!submission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1">
      {submissionType === "text" && (
        <div
          className="flex flex-col gap-4 rounded-xl border border-border p-6 mt-6"
          dangerouslySetInnerHTML={{ __html: submission.content }}
        />
      )}
      {file && <PdfViewer pdfUrl={file.secure_url} />}
    </div>
  );
};

export default SubmissionPreview;
