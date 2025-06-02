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
