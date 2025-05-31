"use client";

import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { generateGradesReport } from "@/lib/report";
import { toast } from "sonner";

type GenerateGradesReportProps = {
  studentIds: string[];
  courseId: string;
};

const GenerateGradesReport = ({
  studentIds,
  courseId,
}: GenerateGradesReportProps) => {
  const handleDownloadCsv = async () => {
    const { success, error } = await generateGradesReport(studentIds, courseId);

    if (error || !success) {
      toast.error("Error generating report. Please try again later: " + error);
      console.error("Error generating report:", error);

      return;
    }

    const csv = Papa.unparse(success);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "grades_report.csv");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={handleDownloadCsv}>
      <Share className="size-4" /> Generate report
    </Button>
  );
};

export default GenerateGradesReport;
