import { Button } from "@/components/ui/button";
import { addAttachmentFlag } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type PdfViewerProps = {
  pdfUrl: string;
  showDownload?: boolean;
};

const PdfViewer = ({ pdfUrl, showDownload }: PdfViewerProps) => {
  return (
    <div className="flex flex-col gap-4">
      {showDownload && (
        <Link
          className="w-min"
          href={addAttachmentFlag(pdfUrl)}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Download PDF</Button>
        </Link>
      )}
      <iframe src={pdfUrl} width="100%" height="600px" />
    </div>
  );
};

export default PdfViewer;
