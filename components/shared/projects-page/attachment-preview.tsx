import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PdfViewer from "../content-page/pdf-viewer";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { deleteAttachment } from "@/server/actions/delete-attachment";
import { toast } from "sonner";

type AttachmentPreviewProps = {
  name: string;
  type: string;
  url: string;
  id: string;
  taskId: string;
};

const AttachmentPreview = ({
  name,
  type,
  url,
  id,
  taskId,
}: AttachmentPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isExecuting } = useAction(deleteAttachment, {
    onExecute: () => {
      toast.dismiss();
      toast.loading("Deleting attachment...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Attachment deleted");
      setIsOpen(false);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error deleting attachment");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-none w-full h-auto overflow-hidden text-muted-foreground flex justify-start items-center gap-4"
        >
          {type === "raw" ? (
            <div className="flex gap-4 items-center">
              <FileIcon size={24} /> <p className="text-sm">{name}</p>
            </div>
          ) : (
            <>
              <img
                src={url}
                alt={name}
                className="size-12 rounded-sm object-cover"
              />{" "}
              <p className="text-sm">{name}</p>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="flex flex-col gap-4">
          {type === "raw" ? (
            <PdfViewer pdfUrl={url} />
          ) : (
            <div className="relative aspect-square">
              <Image src={url} alt={name} fill className="object-contain" />
            </div>
          )}
          <div className="flex gap-4 w-full">
            <Button
              className="w-full hover:text-primary"
              variant="outline"
              type="button"
              onClick={() => {
                execute({ taskId, attachmentId: name });
              }}
              disabled={isExecuting}
            >
              Delete attachment
            </Button>
            <Link
              className="w-full"
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full">Download</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttachmentPreview;
