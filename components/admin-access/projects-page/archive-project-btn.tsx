"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { archiveProject } from "@/server/actions/archive-project";
import { toast } from "sonner";

type ArchiveProjectBtnProps = {
  projectId: string;
  isArchived: boolean;
};

const ArchiveProjectBtn = ({
  projectId,
  isArchived,
}: ArchiveProjectBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isExecuting } = useAction(archiveProject, {
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.data?.success);
      setIsOpen(false);
    },
    onError: (data) => {
      toast.dismiss();
      toast.error(JSON.stringify(data.error));
      setIsOpen(false);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading(
        isArchived ? "Unarchiving project..." : "Archiving project..."
      );
    },
  });

  const handleArchive = () => {
    execute({ projectId });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="hover:text-primary">
          <Archive className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isArchived ? "Unarchive" : "Archive"} project
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {isArchived ? "unarchive" : "archive"} this
            project?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isExecuting} onClick={handleArchive}>
            {isArchived ? "Unarchive" : "Archive"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ArchiveProjectBtn;
