"use client";

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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteProject } from "@/server/actions/delete-project";
import { toast } from "sonner";

type EditProjectBtnProps = {
  projectId: string;
};

const DeleteProjectBtn = ({ projectId }: EditProjectBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isExecuting } = useAction(deleteProject, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Project deleted successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Error deleting project: " + error);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Deleting project...");
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button notAnimated variant="outline" className="hover:text-primary">
          <Trash className="size-4 text-primary" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            project and all associated tasks.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isExecuting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isExecuting}
            onClick={() => execute({ projectId })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectBtn;
