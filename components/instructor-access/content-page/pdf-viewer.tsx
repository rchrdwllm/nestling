import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <Link
        className="w-min"
        href={pdfUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>Download PDF</Button>
      </Link>
      <iframe src={pdfUrl} width="100%" height="600px" />
    </div>
  );
};

export default PdfViewer;
