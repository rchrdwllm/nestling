"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ticketCategories,
  ticketPriorities,
  ticketStatuses,
} from "@/constants/ticket";
import { Ticket } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

export const ticketsTableCols: ColumnDef<Ticket>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const ticketId = row.original.id;

      return (
        <Link href={`/help/tickets/${ticketId}`}>
          <Button className="px-0" variant="link">
            {title}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const ticketStatus = ticketStatuses.find((s) => s.value === status)!;

      return (
        <Badge style={{ backgroundColor: ticketStatus.color }}>
          {ticketStatus.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      const ticketPriority = ticketPriorities.find(
        (p) => p.value === priority
      )!;

      return (
        <Badge style={{ backgroundColor: ticketPriority.color }}>
          {ticketPriority.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category");
      const ticketCategory = ticketCategories.find(
        (c) => c.value === category
      )!;

      return <Badge variant="secondary">{ticketCategory.name}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Opened on",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedDate = formatInTimeZone(
        createdAt,
        timeZone,
        "MM-dd-yyyy h:mm a"
      );

      return <p className="text-sm font-mono">{formattedDate}</p>;
    },
  },
];
