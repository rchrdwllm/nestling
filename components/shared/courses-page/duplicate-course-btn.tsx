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
import { Button } from "@/components/ui/button";
import { duplicateCourse } from "@/server/actions/duplicate-course";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type DuplicateCourseBtnProps = {
  courseId: string;
};

const DuplicateCourseBtn = ({ courseId }: DuplicateCourseBtnProps) => {
  const { execute, isExecuting } = useAction(duplicateCourse, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.error ? `Error: ${data.error}` : `${data?.success}`);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error duplicating course: ${error}`);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Duplicating course...");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          notAnimated
          variant="ghost"
          className="block px-2 py-1.5 w-full font-normal text-sm text-left"
        >
          Duplicate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to duplicate this course? Duplicating the course
            will create a copy of this course but without any students enrolled.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isExecuting}
            onClick={() => execute({ courseId })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DuplicateCourseBtn;
