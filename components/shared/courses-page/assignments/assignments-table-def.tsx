"use client";

import { Button } from "@/components/ui/button";
import DateDisplay from "@/components/ui/date-display";
import { Content } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

export const assignmentsTableDef: ColumnDef<Content>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const contentId = row.original.id;
      const courseId = row.original.courseId;

      return (
        <Link href={`/courses/${courseId}/modules/content/${contentId}`}>
          <Button variant="link" className="px-0">
            {title}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Open from",
    cell: ({ row }) => {
      const startDate = row.getValue("startDate") as string;

      return (
        <p className="text-sm font-mono">
          <DateDisplay date={startDate} outputFormat="MM-dd-yyyy h:mm a" />
        </p>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "Due by",
    cell: ({ row }) => {
      const endDate = row.getValue("endDate") as string;

      return (
        <p className="text-sm font-mono">
          <DateDisplay date={endDate} outputFormat="MM-dd-yyyy h:mm a" />
        </p>
      );
    },
  },
];
