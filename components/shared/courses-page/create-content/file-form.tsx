import { Button } from "@/components/ui/button";
import { MAX_SIZE } from "@/constants/file";
import { getSHA256 } from "@/lib/sha-256";
import { deleteFile } from "@/server/actions/delete-file";
import { deleteFileFromCloudinary } from "@/server/actions/delete-from-cloudinary";
import { uploadFile } from "@/server/actions/upload-file";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { CloudinaryFile } from "@/types";
import { Paperclip, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { ChangeEvent, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

type FileFormProps = {
  contentFile?: CloudinaryFile | null;
};

const FileForm = ({ contentFile }: FileFormProps) => {
  const { getValues } = useFormContext();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadedFile, setUploadedFile] = useState<CloudinaryFile | null>(null);
  const { execute, isExecuting: isUploading } = useAction(uploadFile, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });
  const { execute: execDeleteFile, isExecuting: isDeleting } = useAction(
    deleteFile,
    {
      onSuccess: ({ data }) => {
        toast.dismiss();
        toast.success(
          data?.success ? "File deleted successfully" : "File deletion failed"
        );

        setFile(undefined);
        setUploadedFile(null);
      },
      onError: (error) => {
        toast.dismiss();
        toast.error("File deletion failed: " + JSON.stringify(error));
      },
    }
  );

  const addFile = useCallback(async (e: ChangeEvent) => {
    toast.dismiss();
    toast.loading("Uploading file...");

    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    setFile(file);

    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error("File size exceeds 100MB limit.");
        return;
      }

      const hash = await getSHA256(file);
      const { success: uploadedFile, error } = await uploadFileToCloudinary(
        file
      );

      if (uploadedFile) {
        setUploadedFile(uploadedFile);
        execute({
          ...uploadedFile,
          type: file.type,
          content_id: getValues("id"),
          hash,
        });
      } else {
        toast.error(JSON.stringify(error));
      }
    }
  }, []);

  const handleFileDelete = async () => {
    if (uploadedFile) {
      try {
        toast.dismiss();
        toast.loading("Deleting file...");

        await deleteFileFromCloudinary(uploadedFile.public_id);

        execDeleteFile({
          public_id: uploadedFile.public_id,
          content_id: getValues("id"),
        });
      } catch (error) {
        console.error("File deletion failed:", error);

        toast.dismiss();
        toast.error("File deletion failed: " + JSON.stringify(error));
      }
    } else if (contentFile) {
      toast.dismiss();
      toast.loading("Deleting file...");

      execDeleteFile({
        public_id: contentFile.public_id,
        content_id: getValues("id"),
      });
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <label
          htmlFor="file-input"
          className="flex flex-1 items-center gap-2 bg-background hover:bg-accent shadow-sm px-3 py-2 border border-input rounded-md text-muted-foreground text-sm transition-colors hover:text-accent-foreground cursor-pointer"
        >
          <Paperclip className="w-4 h-4 pointer-events-none" />
          {contentFile ? (
            <span className="truncate">
              {contentFile.original_filename || contentFile.public_id}
            </span>
          ) : file ? (
            <span className="truncate">{file.name}</span>
          ) : (
            <span>Upload a file</span>
          )}
        </label>
        {(file || contentFile) && (
          <Button
            type="button"
            variant="outline"
            className="text-primary hover:text-primary"
            onClick={handleFileDelete}
            disabled={isUploading || isDeleting}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      <input
        onChange={addFile}
        type="file"
        id="file-input"
        className="hidden"
        name="file-input"
      />
    </>
  );
};

export default FileForm;
