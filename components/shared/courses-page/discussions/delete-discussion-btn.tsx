"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
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
import { deleteDiscussion } from "@/server/actions/delete-discussion";
import { useParams, useRouter } from "next/navigation";

type DeleteDiscussionBtnProps = {
  discussionId: string;
};

const DeleteDiscussionBtn = ({ discussionId }: DeleteDiscussionBtnProps) => {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const { execute, isExecuting } = useAction(deleteDiscussion, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.success);
      router.push(`/courses/${courseId}/discussions`);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Failed to delete discussion: " + JSON.stringify(error));
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Deleting discussion...");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          notAnimated
          variant="ghost"
          className="block px-2 py-1.5 w-full font-normal text-primary hover:text-primary text-sm text-left"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            discussion and all of its replies.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isExecuting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isExecuting}
            onClick={() => execute({ discussionId })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDiscussionBtn;
