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
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { deleteContent } from "@/server/actions/delete-content";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

type DeleteContentBtnProps = {
  contentId: string;
};

const DeleteContentBtn = ({ contentId }: DeleteContentBtnProps) => {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const { execute, isExecuting } = useAction(deleteContent, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Content deleted successfully");
      router.push(`/courses/${courseId}`);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error deleting content: ${error}`);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Deleting content...");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          notAnimated
          variant="ghost"
          className="text-primary hover:text-primary"
        >
          <Trash className="size-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently the course
            content along with associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isExecuting}
            onClick={() => execute({ contentId })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContentBtn;
