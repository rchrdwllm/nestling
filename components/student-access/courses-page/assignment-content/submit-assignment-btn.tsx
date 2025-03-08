"use client";

import RichTextEditor from "@/components/instructor-access/courses-page/create-content/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SubmitAssignmentSchema } from "@/schemas/SubmitAssignmentSchema";
import { UploadFileSchema } from "@/schemas/UploadFileSchema";
import { submitAssignment } from "@/server/actions/submit-assignment";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type SubmitAssignmentBtnProps = {
  contentId: string;
  submissionType: string;
};

const SubmitAssignmentBtn = ({
  contentId,
  submissionType,
}: SubmitAssignmentBtnProps) => {
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
  const { execute, isExecuting } = useAction(submitAssignment, {
    onSuccess: () => {
      setIsOpen(false);
      setFile(undefined);
      setIsLoading(false);

      toast.dismiss();
      toast.success("Assignment submitted successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });

  const addFile = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

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
    } else if (submissionType === "file") {
      if (file) {
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
        <Button>Submit assignment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit assignment</DialogTitle>
          <DialogDescription>
            Upload a file to submit your assignment
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAssignmentSubmit)}>
            {submissionType === "file" ? (
              <>
                <button
                  type="button"
                  className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer group transition-colors"
                >
                  <label
                    className="flex flex-col justify-center items-center gap-2 w-full py-8 cursor-pointer text-muted-foreground transition-colors group-hover:text-foreground"
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
                  </FormItem>
                )}
              />
            )}
            <div className="mt-4 flex flex-col gap-4">
              <Button
                onClick={() => console.log(form.getValues("content"))}
                type="submit"
                disabled={isExecuting}
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
    </Dialog>
  );
};

export default SubmitAssignmentBtn;
