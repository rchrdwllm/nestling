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
import { deleteDiscussionReply } from "@/server/actions/delete-discussion-reply";

type DeleteReplyBtnProps = {
  replyId: string;
};

const DeleteReplyBtn = ({ replyId }: DeleteReplyBtnProps) => {
  const { execute, isExecuting } = useAction(deleteDiscussionReply, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.success);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(
        "Failed to delete discussion reply: " + JSON.stringify(error)
      );
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Deleting discussion reply...");
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
            This action cannot be undone. This will permanently delete the
            discussion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isExecuting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isExecuting}
            onClick={() => execute({ replyId })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteReplyBtn;
