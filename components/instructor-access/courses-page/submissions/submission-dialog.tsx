"use client";

import PdfViewer from "@/components/shared/content-page/pdf-viewer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/types";

type SubmissionDialogProps = {
  user: User;
  fileUrl: string;
};

const SubmissionDialog = ({ user, fileUrl }: SubmissionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <p>
          {user.firstName} {user.lastName}'s submission
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user.firstName} {user.lastName}'s submission
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PdfViewer pdfUrl={fileUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDialog;
