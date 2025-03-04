"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { submitAssignment } from "@/server/actions/submit-assignment";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { Paperclip } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "sonner";

const SubmitAssignmentBtn = ({ contentId }: { contentId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { execute, isExecuting } = useAction(submitAssignment, {
    onSuccess: () => {
      setIsOpen(false);
      setFile(undefined);

      toast.dismiss();
      toast.success("Assignment submitted successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Submitting assignment...");
    },
  });

  const addFile = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    setFile(file);
  }, []);

  const handleAssignmentSubmit = async () => {
    if (file) {
      const { success: uploadedFile, error } = await uploadFileToCloudinary(
        file
      );

      if (uploadedFile) {
        execute({
          asset_id: uploadedFile.asset_id,
          content_id: contentId,
          created_at: uploadedFile.created_at,
          public_id: uploadedFile.public_id,
          secure_url: uploadedFile.secure_url,
          type: file.type,
          url: uploadedFile.url,
        });
      } else {
        toast.error(JSON.stringify(error));
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
        <div>
          <button className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer group transition-colors">
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
        </div>
        <Button
          type="submit"
          onClick={handleAssignmentSubmit}
          disabled={isExecuting}
        >
          Submit
        </Button>
        <Button
          type="button"
          onClick={() => setIsOpen(false)}
          variant="secondary"
          disabled={isExecuting}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitAssignmentBtn;
