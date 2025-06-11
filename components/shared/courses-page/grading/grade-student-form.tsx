"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GradeSubmissionSchema } from "@/schemas/GradeSubmissionSchema";
import { gradeSubmission } from "@/server/actions/grade-submission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type GradeStudentFormProps = {
  submissionId: string;
  grade: string | undefined;
  points: number;
  contentId: string;
  studentId: string;
};

const GradeStudentForm = ({
  grade,
  submissionId,
  points,
  studentId,
  contentId,
}: GradeStudentFormProps) => {
  const form = useForm<z.infer<typeof GradeSubmissionSchema>>({
    resolver: zodResolver(GradeSubmissionSchema),
    defaultValues: {
      grade: grade || "0",
      submissionId,
    },
  });
  const { execute, isExecuting } = useAction(gradeSubmission, {
    onExecute: () => {
      toast.dismiss();
      toast.loading("Grading submission...");
    },
    onSuccess: ({ data }) => {
      toast.dismiss();

      if (data?.success) {
        toast.success(data.success);
      } else if (data?.error) {
        console.error(data.error);
        toast.error(JSON.stringify(data.error));
      }
    },
    onError: (error) => {
      toast.dismiss();
      console.error(error);
      toast.error(JSON.stringify(error));
    },
  });

  useEffect(() => {
    form.setValue("grade", grade || "0");
    form.setValue("submissionId", submissionId);
  }, [grade, submissionId]);

  const handleSubmit = (data: z.infer<typeof GradeSubmissionSchema>) => {
    execute(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      execute({
        contentId,
        grade: form.getValues("grade"),
        studentId,
        submissionId,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-4"
      >
        {" "}
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 text-sm">
              <FormControl>
                <Input
                  max={points}
                  placeholder="Grade"
                  type="number"
                  className="w-16"
                  {...field}
                />
              </FormControl>
              <span className="block w-full [margin-top:_0_!important]">
                {" "}
                out of {points} points
              </span>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default GradeStudentForm;
