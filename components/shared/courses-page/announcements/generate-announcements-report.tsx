"use client";

import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { generateAnnouncementsReport } from "@/lib/report";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type GenerateAnnouncementsReportProps = {
  courseId: string;
  courseTitle: string;
  courseCode: string;
};

const GenerateAnnouncementsReport = ({
  courseId,
  courseTitle,
  courseCode,
}: GenerateAnnouncementsReportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCsv = async () => {
    const { success, error } = await generateAnnouncementsReport(courseId);

    if (error || !success) {
      toast.dismiss();
      toast.error("Error generating report. Please try again later: " + error);
      console.error("Error generating report:", error);

      return;
    }

    const csv = Papa.unparse(success);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = formatInTimeZone(
      date,
      timeZone,
      "MMMM-d-yyyy-HH-mm-ss"
    );

    link.href = url;
    link.setAttribute(
      "download",
      `announcements_report_${courseCode.replace(
        /\s/g,
        ""
      )}_${formattedDate.replace(/\s|:/g, "-")}.csv`
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    const { success, error } = await generateAnnouncementsReport(courseId);

    if (error || !success) {
      toast.dismiss();
      toast.error("Error generating report. Please try again later: " + error);
      console.error("Error generating report:", error);
      return;
    }

    const doc = new jsPDF();
    const date = new Date().toISOString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = formatInTimeZone(
      date,
      timeZone,
      "MMMM-d-yyyy HH:mm:ss zzz"
    );

    doc.setFontSize(16);
    doc.text(`Announcements Report: ${courseCode} - ${courseTitle}`, 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated: ${formattedDate}`, 14, 26);

    const headers = [["ID", "Title", "Content", "Created At", "User ID"]];
    const rows = success.map((row: any) => [
      row.id,
      row.title,
      row.content,
      row.createdAt,
      row.userId,
    ]);

    autoTable(doc, {
      head: headers,
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [223, 7, 21] },
      margin: { top: 32 },
    });

    doc.save(
      `announcements_report_${courseCode.replace(
        /\s/g,
        ""
      )}_${formattedDate.replace(/\s|:/g, "-")}.pdf`
    );
  };

  const handleExport = async () => {
    toast.dismiss();
    setIsLoading(true);

    if (!format) {
      toast.error("Please select a format to export the data.");

      return;
    }

    toast.loading("Exporting data...");

    if (format === "pdf") {
      await handleDownloadPdf();

      setIsOpen(false);
    } else if (format === "csv") {
      await handleDownloadCsv();

      setIsOpen(false);
    }

    toast.dismiss();
    toast.success("Data exported successfully!");
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button notAnimated variant="outline">
          <Share className="size-4" /> Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export announcements</DialogTitle>
          <DialogDescription>
            Choose a format to export the data
          </DialogDescription>
        </DialogHeader>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleExport}>
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateAnnouncementsReport;
