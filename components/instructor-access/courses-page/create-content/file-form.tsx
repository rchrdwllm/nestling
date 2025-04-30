import { Button } from "@/components/ui/button";
import { getSHA256 } from "@/lib/sha-256";
import { deleteFile } from "@/server/actions/delete-file";
import { deleteFileFromCloudinary } from "@/server/actions/delete-from-cloudinary";
import { uploadFile } from "@/server/actions/upload-file";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { File as FirestoreFile } from "@/types";
import { Paperclip, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { ChangeEvent, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const FileForm = () => {
  const { getValues } = useFormContext();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadedFile, setUploadedFile] = useState<FirestoreFile | null>(null);
  const { execute } = useAction(uploadFile, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Uploading file...");
    },
  });

  const addFile = useCallback(async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    setFile(file);

    if (file) {
      const hash = await getSHA256(file);
      const { success: uploadedFile, error } = await uploadFileToCloudinary(
        file
      );

      if (uploadedFile) {
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
        setFile(undefined);
        setUploadedFile(null);

        await deleteFileFromCloudinary(uploadedFile.public_id);
        await deleteFile({ public_id: uploadedFile.public_id });
      } catch (error) {
        console.error("File deletion failed:", error);
      }
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors rounded-md border-2"
        >
          <label
            htmlFor="file-input"
            className="px-3 py-2 w-full text-sm cursor-pointer flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-4 h-4 pointer-events-none " />
            {file ? (
              <span className="truncate">{file.name}</span>
            ) : (
              <span>Upload a file</span>
            )}
          </label>
        </button>
        {file && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleFileDelete}
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
