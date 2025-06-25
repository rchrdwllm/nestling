import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PdfViewer from "../content-page/pdf-viewer";
import { FileIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { deleteAttachment } from "@/server/actions/delete-attachment";
import { toast } from "sonner";
import { addAttachmentFlag } from "@/lib/utils";
import { verifyFileIntegrity } from "@/lib/file";

type AttachmentPreviewProps = {
  name: string;
  type: string;
  url: string;
  id: string;
  taskId: string;
  hash?: string;
};

const AttachmentPreview = ({
  name,
  type,
  url,
  id,
  taskId,
  hash,
}: AttachmentPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
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

  const handleVerify = async () => {
    setIsLoading(true);

    const isVerified = await verifyFileIntegrity(url, hash || "");

    setIsVerified(isVerified);
    setIsLoading(false);
  };

  useEffect(() => {
    if (url && hash) {
      handleVerify();
    }
  }, [url, hash]);

  if (isLoading)
    return (
      <div className="flex items-center px-4 py-3">
        <p className="text-muted-foreground text-sm">Verifying...</p>
      </div>
    );

  if (!isVerified) {
    return (
      <div className="bg-red-50 dark:bg-red-950 p-4 text-red-800 dark:text-red-400">
        <p>This file may have been tampered with</p>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-start items-center gap-4 rounded-none w-full h-auto overflow-hidden text-muted-foreground"
        >
          {type === "raw" ? (
            <div className="flex items-center gap-4">
              <FileIcon size={24} /> <p className="text-sm">{name}</p>
            </div>
          ) : (
            <>
              <img
                src={url}
                alt={name}
                className="rounded-sm size-12 object-cover"
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
              href={addAttachmentFlag(url)}
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
