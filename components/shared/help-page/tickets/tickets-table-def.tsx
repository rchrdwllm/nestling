"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ticketCategories,
  ticketPriorities,
  ticketStatuses,
} from "@/constants/ticket";
import { archiveTicket } from "@/server/actions/archive-ticket";
import { Ticket } from "@/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";
import { MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";

export const ticketsTableCols: ColumnDef<Ticket>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const ticketId = row.original.id;

      return (
        <Link href={`/support-tickets/${ticketId}`}>
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

      return <p className="font-mono text-sm">{formattedDate}</p>;
    },
  },
];

export const adminTicketsTableCols: ColumnDef<Ticket>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const ticketId = row.original.id;

      return (
        <Link href={`/support-tickets/${ticketId}`}>
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

      return <p className="font-mono text-sm">{formattedDate}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticketId = row.original.id as string;
      const isArchived = row.original.isArchived as boolean;
      const { execute } = useAction(archiveTicket, {
        onSuccess: ({ data }) => {
          toast.dismiss();

          if (data?.success) {
            toast.success(data.success);
          } else if (data?.error) {
            toast.error(data.error as any);
          }
        },
        onError: () => {
          toast.dismiss();
          toast.error(
            `Failed to ${
              isArchived ? "unarchive" : "archive"
            } ticket. Please try again.`
          );
        },
        onExecute: () => {
          toast.dismiss();
          toast.loading(
            `${isArchived ? "Unarchiving" : "Archiving"} ticket...`
          );
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button notAnimated variant="ghost" className="p-0 w-8 h-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => execute({ ticketId })}>
              {isArchived ? "Unarchive" : "Archive"} ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
