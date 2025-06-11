"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradeSubmissionSchema } from "@/schemas/GradeSubmissionSchema";
import { gradeSubmission } from "@/server/actions/grade-submission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type GradeSubmissionFormProps = {
  submissionId: string;
  studentId: string;
  contentId: string;
  points: number;
  isGraded: boolean;
  grade: string | undefined;
  isMultipleAttempts: boolean;
  feedback?: string;
};

const GradeSubmissionForm = ({
  submissionId,
  studentId,
  contentId,
  points,
  isGraded,
  grade,
  feedback,
  isMultipleAttempts,
}: GradeSubmissionFormProps) => {
  const form = useForm<z.infer<typeof GradeSubmissionSchema>>({
    resolver: zodResolver(GradeSubmissionSchema),
    defaultValues: {
      grade: grade || "0",
      feedback: feedback || "",
      studentId,
      contentId,
      submissionId,
      regrade: isGraded,
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
        toast.error(JSON.stringify(data.error));
      }
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });

  useEffect(() => {
    form.setValue("grade", grade || "0");
    form.setValue("feedback", feedback || "");
  }, [grade]);

  const handleSubmit = (data: z.infer<typeof GradeSubmissionSchema>) => {
    execute(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold">
        {isMultipleAttempts
          ? isGraded
            ? "Regrade latest submission"
            : "Grade latest submission"
          : isGraded
          ? "Regrade submission"
          : "Grade submission"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          {" "}
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      max={points}
                      placeholder="Grade"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <span className="block w-full [margin-top:_0_!important]">
                    {" "}
                    out of {points} points
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="feedback"
            defaultValue={feedback || ""}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Feedback" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isExecuting}>
            {isGraded ? "Regrade" : "Grade"} submission
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GradeSubmissionForm;
