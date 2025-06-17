"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAction } from "next-safe-action/hooks";
import { enrollStudent } from "@/server/actions/enroll-student";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { useState } from "react";

export const coursesCols: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const { user } = useCurrentUser();
      const title = row.getValue("name") as string;
      const id = row.original.id;
      const { execute, isExecuting } = useAction(enrollStudent, {
        onSuccess: ({ data }) => {
          if (data?.success) {
            toast.dismiss();
            toast.success("Enrollment successful!");
            setIsOpen(false);
          } else {
            toast.dismiss();
            console.error("Enrollment error:", data?.error);
            toast.error("Enrollment failed: " + data?.error);
          }
        },
        onError: (error) => {
          toast.dismiss();
          console.error("Enrollment error:", error);
          toast.error("An error occurred while enrolling in the course.");
        },
        onExecute: () => {
          toast.dismiss();
          toast.loading("Enrolling in course...");
        },
      });

      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button notAnimated className="p-0 text-foreground" variant="link">
              {title}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enroll in course?</DialogTitle>
              <DialogDescription>
                Are you sure you want to enroll in <strong>{title}</strong>?
                This will allow you to access the course materials and
                participate in the course activities.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isExecuting} type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={isExecuting}
                onClick={() => {
                  execute({ courseId: id, studentId: user.id });
                }}
                type="button"
              >
                Enroll
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      const description = getValue() as string;

      return (
        <span className="max-w-[500px] text-muted-foreground text-ellipsis">
          {description}
        </span>
      );
    },
  },
];
