"use client";

import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { generateGradesReport } from "@/lib/report";
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
import { UserActivity } from "@/types";

type GenerateGradesReportProps = {
  data: UserActivity[];
};

const GenerateLogsReport = ({ data }: GenerateGradesReportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCsv = async () => {
    const dataWithoutDetails = data.map(({ details, ...rest }) => rest);
    const csv = Papa.unparse(dataWithoutDetails);
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
    link.setAttribute("download", `logs_report_${formattedDate}.csv`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();
    const date = new Date().toISOString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = formatInTimeZone(
      date,
      timeZone,
      "MMMM-d-yyyy HH:mm:ss zzz"
    );

    doc.setFontSize(16);
    doc.text(`Logs Report`, 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated: ${formattedDate}`, 14, 26);
    doc.text(`Total logs: ${data.length}`, 14, 32);

    const allHeaders = Object.keys(data[0] || {});
    const headers = [allHeaders.filter((key) => key !== "details")];
    const rows = data.map((row: any) => headers[0].map((key) => row[key]));

    autoTable(doc, {
      head: headers,
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [223, 7, 21] },
      margin: { top: 32 },
    });

    const safeDate = formattedDate.replace(/\s|:/g, "-");
    doc.save(`logs_report_${safeDate.replace(/\s|:/g, "-")}.pdf`);
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

      toast.dismiss();
      setIsOpen(false);
    } else if (format === "csv") {
      await handleDownloadCsv();

      toast.dismiss();
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
          <DialogTitle>Export logs</DialogTitle>
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

export default GenerateLogsReport;
