"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { enrollStudent } from "@/server/actions/enroll-student";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type EnrollBtnProps = {
  courseId: string;
  setParentOpen: (open: boolean) => void;
};

const EnrollBtn = ({ courseId, setParentOpen }: EnrollBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useCurrentUser();
  const router = useRouter();
  const { execute, isExecuting } = useAction(enrollStudent, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(
        data?.error
          ? `Error enrolling in course: ${data.error}`
          : "Successfully enrolled in course!"
      );

      if (data?.success) {
        setParentOpen(false);
        router.push(`/courses/${courseId}`);
      }
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error enrolling in course: ${error}`);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Enrolling in course...");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Enroll</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Enrolling in this course will allow you to access all its content
            and participate in discussions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={isExecuting} asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={isExecuting}
            onClick={() => execute({ courseId, studentId: user.id })}
          >
            Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollBtn;
