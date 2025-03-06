import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import { getFile } from "@/lib/file";
import { File, Submission } from "@/types";
import { useEffect, useState } from "react";

const SubmissionPreview = ({
  submission,
}: {
  submission: Submission | null;
}) => {
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
    if (submission) {
      fetchSubmissionFile();
    }
  }, [submission]);

  return (
    <div className="flex-1">
      {file && <PdfViewer pdfUrl={file.secure_url} />}
    </div>
  );
};

export default SubmissionPreview;
