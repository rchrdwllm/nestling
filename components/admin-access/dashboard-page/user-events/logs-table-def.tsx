"use client";

import { Button } from "@/components/ui/button";
import { UserActivity } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

export const logsTableCols: ColumnDef<UserActivity>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => {
      const userId = row.getValue("userId") as string;

      return (
        <Link href={`/search/user/${userId}`}>
          <Button variant="link" className="px-0">
            {userId}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: "Timestamp",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedDate = formatInTimeZone(
        createdAt,
        timeZone,
        "MM-dd-yyyy h:mm a"
      );

      return <p>{formattedDate}</p>;
    },
  },
];

export const logsTableColsWithDetails: ColumnDef<UserActivity>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => {
      const userId = row.getValue("userId") as string;

      return (
        <Link href={`/search/user/${userId}`}>
          <Button variant="link" className="px-0">
            {userId}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "targetId",
    header: "Target ID",
    cell: ({ row }) => {
      const targetId = row.getValue("targetId") as string;
      const type = row.getValue("type") as string;
      const details = row.original.details;

      if (!details) {
        return <p className="text-sm">{targetId}</p>;
      }

      let href = "";

      switch (type) {
        case "view_course":
          href = `/courses/${targetId}`;
          break;
        case "view_content":
          href = `/courses/${details.courseId}/content/${targetId}`;
          break;
        case "view_project":
          href = `/projects/${targetId}`;
          break;
        case "submit_assignment":
          href = `/courses/${details.courseId}/modules/content/${details.contentId}/submissions`;
          break;
        case "grade_submission":
          href = `/courses/${details.courseId}/modules/content/${details.contentId}/submissions/${targetId}?studentId=${details.studentId}`;
          break;
        default:
          return <p>{targetId}</p>;
      }

      return (
        <Link href={href}>
          <Button variant="link" className="px-0">
            {targetId}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Timestamp",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedDate = formatInTimeZone(
        createdAt,
        timeZone,
        "MM-dd-yyyy h:mm a"
      );

      return <p>{formattedDate}</p>;
    },
  },
];
