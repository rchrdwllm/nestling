"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DateDisplay from "@/components/ui/date-display";
import { projectPriorities, projectStatuses } from "@/constants/project";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

type ProjectCol = {
  id: string;
  title: string;
  description?: string;
  status: "planned" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  startDate: string;
  endDate: string;
};

export const projectCols: ColumnDef<ProjectCol>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const id = row.original.id;

      return (
        <Link href={`/projects/${id}`}>
          <Button className="p-0 text-foreground" variant="link">
            {title}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const statusData = projectStatuses.find((s) => s.value === status)!;

      return (
        <Badge style={{ backgroundColor: statusData.color }}>
          {statusData.name.charAt(0).toUpperCase() + statusData.name.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ getValue }) => {
      const priority = getValue() as string;
      const priorityData = projectPriorities.find((p) => p.value === priority)!;

      return (
        <Badge style={{ backgroundColor: priorityData.color }}>
          {priorityData.name.charAt(0).toUpperCase() +
            priorityData.name.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as any;

      return <DateDisplay date={date} />;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ getValue }) => {
      const date = getValue() as any;

      return <DateDisplay date={date} />;
    },
  },
];
