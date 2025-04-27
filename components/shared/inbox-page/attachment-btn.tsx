import { Button } from "@/components/ui/button";
import { InboxSchema } from "@/schemas/InboxSchema";
import { uploadFile } from "@/server/actions/upload-file";
import { uploadFileToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { Paperclip } from "lucide-react";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const AttachmentBtn = () => {
  const form = useFormContext<z.infer<typeof InboxSchema>>();

  const addFile = async (e: ChangeEvent) => {
    toast.dismiss();
    toast.loading("Uploading files...");

    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      form.setValue("type", "file");

      const successfulUploads = await Promise.all(
        Array.from(files).map(async (file) => {
          const { success: uploadedFile, error } = await uploadFileToCloudinary(
            file
          );

          if (uploadedFile) {
            try {
              await uploadFile({
                ...uploadedFile,
                message_id: form.getValues("id"),
              });

              return { success: uploadedFile };
            } catch (err) {
              console.error("Error uploading file:", err);
              toast.error(JSON.stringify(err));
            }
          } else if (error) {
            console.error("Error uploading file:", error);
            toast.error(JSON.stringify(error));
          }
        })
      );

      const uploads = successfulUploads.map((upload) => upload?.success);

      form.setValue(
        "files",
        uploads.filter((file) => file !== undefined)
      );

      toast.dismiss();
      toast.success("Files uploaded!");
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={addFile}
        className="hidden"
        name="file-input"
        id="file-input"
        multiple
      />
      <Button variant="outline" className="p-0 cursor-pointer" type="button">
        <label htmlFor="file-input" className="px-4 cursor-pointer">
          <Paperclip />
        </label>
      </Button>
    </>
  );
};

export default AttachmentBtn;
