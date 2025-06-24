"use client";

import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import {
  generateCourseStudentsReport,
  generateCourseInstructorsReport,
} from "@/lib/report";
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

const userTypes = [
  { label: "Students", value: "students" },
  { label: "Instructors", value: "instructors" },
];

const reportFns: Record<string, (courseId: string) => Promise<any>> = {
  students: generateCourseStudentsReport,
  instructors: generateCourseInstructorsReport,
};

type GenerateCourseUsersReportProps = {
  courseId: string;
  courseTitle: string;
  courseCode: string;
};

const GenerateCourseUsersReport = ({
  courseId,
  courseTitle,
  courseCode,
}: GenerateCourseUsersReportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<string | undefined>(undefined);
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCsv = async (data: any[], type: string) => {
    const csv = Papa.unparse(data);
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
      `${type}_report_${courseCode.replace(/\s+/g, "")}_${formattedDate}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async (data: any[], type: string) => {
    const doc = new jsPDF();
    const date = new Date().toISOString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = formatInTimeZone(
      date,
      timeZone,
      "MMMM-d-yyyy HH:mm:ss zzz"
    );
    doc.setFontSize(16);
    doc.text(
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } Report: ${courseCode} - ${courseTitle}`,
      14,
      18
    );
    doc.setFontSize(10);
    doc.text(`Generated: ${formattedDate}`, 14, 26);
    const headers = [Object.keys(data[0] || {})];
    const rows = data.map((row: any) => headers[0].map((key) => row[key]));
    autoTable(doc, {
      head: headers,
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [223, 7, 21] },
      margin: { top: 32 },
    });
    const safeDate = formattedDate.replace(/\s|:/g, "-");
    doc.save(`${type}_report_${courseCode.replace(/\s/g, "")}_${safeDate}.pdf`);
  };

  const handleExport = async () => {
    toast.dismiss();
    setIsLoading(true);
    if (!format || !userType) {
      toast.error("Please select a user type and format.");
      setIsLoading(false);
      return;
    }
    toast.loading("Exporting data...");
    try {
      const { success, error } = await reportFns[userType](courseId);
      if (error || !success) {
        toast.dismiss();
        toast.error(
          "Error generating report. Please try again later: " + error
        );
        setIsLoading(false);
        return;
      }
      if (format === "pdf") {
        await handleDownloadPdf(success, userType);
        setIsOpen(false);
      } else if (format === "csv") {
        await handleDownloadCsv(success, userType);
        setIsOpen(false);
      }
      toast.dismiss();
      toast.success("Data exported successfully!");
    } catch (e) {
      toast.dismiss();
      toast.error("Unexpected error generating report.");
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button notAnimated variant="outline">
          <Share className="size-4" /> Export Course Users
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export course users</DialogTitle>
          <DialogDescription>
            Choose a user type and format to export the data for this course
          </DialogDescription>
        </DialogHeader>
        <Select value={userType} onValueChange={setUserType}>
          <SelectTrigger>
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            {userTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

export default GenerateCourseUsersReport;
