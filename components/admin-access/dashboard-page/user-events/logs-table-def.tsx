"use client";

import { UserActivity } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";

export const logsTableCols: ColumnDef<UserActivity>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
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
