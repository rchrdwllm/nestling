import { Button } from "@/components/ui/button";
import { deleteFile } from "@/server/actions/delete-file";
import { deleteFileFromCloudinary } from "@/server/actions/delete-from-cloudinary";
import { uploadFile } from "@/server/actions/upload-file";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { File as FirestoreFile } from "@/types";
import { Paperclip, X } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const FileForm = () => {
  const { getValues } = useFormContext();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadedFile, setUploadedFile] = useState<FirestoreFile | null>(null);

  const addFile = useCallback(async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    setFile(file);

    if (file) {
      const { success: uploadedFile, error } = await uploadFileToCloudinary(
        file
      );

      if (uploadedFile) {
        try {
          await uploadFile({
            ...uploadedFile,
            type: file.type,
            content_id: getValues("id"),
          }).then((data) => {
            if (data && data.data) {
              const { success: uploadedFile, error } = data.data;

              if (uploadedFile) {
                setUploadedFile(uploadedFile);
              } else {
                toast.error(JSON.stringify(error));
              }
            }
          });
        } catch (error) {
          console.error(error);
        }
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
