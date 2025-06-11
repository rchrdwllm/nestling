"use client";

import { Button } from "@/components/ui/button";
import DateDisplay from "@/components/ui/date-display";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteEmail } from "@/server/actions/delete-email";
import { RegisteredEmail } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const registeredTableCols: ColumnDef<RegisteredEmail>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string;

      return (
        <Button className="py-0 px-0" variant="ghost">
          {email}
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      return (
        <p className="text-sm">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Registered at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;

      return (
        <p className="text-sm font-mono">
          <DateDisplay date={createdAt} outputFormat="MMMM d, yyyy h:mm a" />
        </p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      const { execute } = useAction(deleteEmail, {
        onSuccess: ({ data }) => {
          toast.dismiss();

          if (data?.success) {
            toast.success(data.success);
          } else if (data?.error) {
            toast.error(data.error as any);
          }
        },
        onError: (error) => {
          toast.dismiss();
          toast.error("Failed to delete email. Please try again.");
        },
        onExecute: () => {
          toast.dismiss();
          toast.loading("Deleting email...");
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button notAnimated variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => execute({ email })}>
              Delete email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
