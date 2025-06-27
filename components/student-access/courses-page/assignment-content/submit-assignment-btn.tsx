"use client";

import React, { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import RichTextEditor from "@/components/shared/courses-page/create-content/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MAX_SIZE } from "@/constants/file";
import { getSHA256 } from "@/lib/sha-256";
import { SubmitAssignmentSchema } from "@/schemas/SubmitAssignmentSchema";
import { submitAssignment } from "@/server/actions/submit-assignment";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type SubmitAssignmentBtnProps = {
  contentId: string;
  submissionType: string;
  submissionsLength: number;
  maxAttempts?: number | null;
};

const SubmitAssignmentBtn = ({
  contentId,
  submissionType,
  submissionsLength,
  maxAttempts,
}: SubmitAssignmentBtnProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SubmitAssignmentSchema>>({
    resolver: zodResolver(SubmitAssignmentSchema),
    defaultValues: {
      content: "",
      contentId,
      submissionType,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeConfetti, setFadeConfetti] = useState(false);
  const [width, height] = useWindowSize();
  const { execute, isExecuting } = useAction(submitAssignment, {
    onSuccess: () => {
      setIsOpen(false);
      setFile(undefined);
      setIsLoading(false);

      toast.dismiss();
      toast.success("Assignment submitted successfully");
      router.refresh();
      setShowConfetti(true);
      setFadeConfetti(false);

      setTimeout(() => setFadeConfetti(true), 7000);
      setTimeout(() => setShowConfetti(false), 7500);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });

  const addFile = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error("File size exceeds 100MB limit.");
        return;
      }
    }

    setFile(file);
  }, []);

  const handleAssignmentSubmit = async (
    data: z.infer<typeof SubmitAssignmentSchema>
  ) => {
    setIsLoading(true);

    toast.dismiss();
    toast.loading("Submitting assignment...");

    if (submissionType === "text") {
      execute({ content: data.content, contentId, submissionType });
    } else {
      if (file) {
        if (file.size > MAX_SIZE) {
          toast.error("File size exceeds 100MB limit.");
          return;
        }

        const allowedTypes: Record<string, string[]> = {
          pdf: ["application/pdf"],
          docx: [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
          ],
          xlsx: [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
          ],
          pptx: [
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.ms-powerpoint",
          ],
          mp4: ["video/mp4"],
          other: [],
        };

        if (
          submissionType !== "other" &&
          allowedTypes[submissionType] &&
          !allowedTypes[submissionType].includes(file.type)
        ) {
          toast.error(
            `Invalid file type. Please upload a ${submissionType.toUpperCase()} file.`
          );

          setIsLoading(false);

          return;
        }

        const hash = await getSHA256(file);
        const { success: uploadedFile, error } = await uploadFileToCloudinary(
          file
        );

        if (uploadedFile) {
          execute({
            file: {
              asset_id: uploadedFile.asset_id,
              content_id: contentId,
              created_at: uploadedFile.created_at,
              public_id: uploadedFile.public_id,
              secure_url: uploadedFile.secure_url,
              type: file.type,
              url: uploadedFile.url,
              resource_type: uploadedFile.resource_type,
              original_filename: uploadedFile.original_filename,
              hash,
            },
            content: "",
            submissionType,
            contentId,
          });
        } else {
          toast.error(JSON.stringify(error));
        }
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={
            maxAttempts
              ? submissionsLength >= maxAttempts
              : submissionsLength > 0
          }
        >
          {submissionsLength > 0 ? "New attempt" : "Submit assignment"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit assignment</DialogTitle>
          <DialogDescription>
            {submissionType === "file"
              ? "Upload a file to submit your assignment"
              : "Write your assignment below"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAssignmentSubmit)}>
            {submissionType !== "text" ? (
              <>
                <button
                  type="button"
                  className="group bg-background hover:bg-accent border border-input rounded-md w-full transition-colors hover:text-accent-foreground cursor-pointer"
                >
                  <label
                    className="flex flex-col justify-center items-center gap-2 py-8 w-full text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer"
                    htmlFor="submission"
                  >
                    {file ? (
                      <span className="text-sm">{file.name}</span>
                    ) : (
                      <>
                        <Paperclip />
                        <span className="text-sm">Upload file</span>
                      </>
                    )}
                  </label>
                </button>
                <input
                  type="file"
                  id="submission"
                  name="submission"
                  className="hidden"
                  onChange={addFile}
                  accept={
                    submissionType === "pdf"
                      ? "application/pdf"
                      : submissionType === "docx"
                      ? ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      : submissionType === "xlsx"
                      ? ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      : submissionType === "pptx"
                      ? ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      : submissionType === "mp4"
                      ? "video/mp4"
                      : undefined
                  }
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichTextEditor content={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex flex-col gap-4 mt-4">
              <Button
                type="submit"
                disabled={
                  isExecuting ||
                  isLoading ||
                  (submissionType !== "text" && !file)
                }
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="secondary"
                disabled={isExecuting || isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <style>
        {`
      .confetti-fade {
        opacity: 1;
        transition: opacity 1s ease;
        pointer-events: none;
      }
      .confetti-fade.out {
        opacity: 0;
      }
    `}
      </style>
      {showConfetti && (
        <div className={`confetti-fade${fadeConfetti ? " out" : ""}`}>
          <Confetti width={width} height={height} />
        </div>
      )}
    </Dialog>
  );
};

export default SubmitAssignmentBtn;
