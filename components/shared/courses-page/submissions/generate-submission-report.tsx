"use client";

import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Submission } from "@/types";

type GenerateSubmissionReportProps = {
  submissions: Submission[];
};

const GenerateSubmissionReport = ({
  submissions,
}: GenerateSubmissionReportProps) => {
  const handleDownloadCsv = () => {
    const csv = Papa.unparse(submissions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "submissions_report.csv");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" onClick={handleDownloadCsv}>
      Generate report
    </Button>
  );
};

export default GenerateSubmissionReport;
