"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { EnrollSchema } from "@/schemas/EnrollSchema";
import { enrollStudent } from "@/server/actions/enroll-student";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type EnrollBtnProps = {
  courseCode: string;
  id: string;
  enrolledStudents: User[];
};

const EnrollBtn = ({ courseCode, id, enrolledStudents }: EnrollBtnProps) => {
  const { user } = useCurrentUser();
  const isEnrolled = useMemo(() => {
    return enrolledStudents.some((student) => student.id === user?.id);
  }, [enrolledStudents, user?.id]);
  const form = useForm<z.infer<typeof EnrollSchema>>({
    resolver: zodResolver(EnrollSchema),
    defaultValues: {
      courseId: id,
      studentId: user?.id,
    },
  });
  const { execute, isExecuting, hasSucceeded } = useAction(enrollStudent, {
    onExecute: () => {
      toast.dismiss();
      toast.loading(`Enrolling in ${courseCode}...`);
    },
    onSuccess: ({ data }) => {
      toast.dismiss();

      if (data?.success) {
        toast.success(data.success);
      }

      if (data?.error) {
        toast.error(data.error as string);
      }
    },
  });

  const handleEnroll = (data: z.infer<typeof EnrollSchema>) => {
    execute(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleEnroll)}>
      <Button
        disabled={isExecuting || hasSucceeded || isEnrolled}
        type="submit"
      >
        {isEnrolled ? "Enrolled" : "Enroll"}
      </Button>
    </form>
  );
};

export default EnrollBtn;
