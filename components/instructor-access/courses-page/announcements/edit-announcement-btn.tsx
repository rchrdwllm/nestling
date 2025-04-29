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
import { useState } from "react";
import CreateAnnouncementForm from "./create-announcement-form";
import { Announcement } from "@/types";

type EditAnnouncementBtnProps = {
  announcement: Announcement;
};

const EditAnnouncementBtn = ({ announcement }: EditAnnouncementBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-left block w-full px-2 py-1.5 font-normal"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit announcement</DialogTitle>
          <DialogDescription>Edit announcement details below</DialogDescription>
        </DialogHeader>
        <CreateAnnouncementForm
          setIsOpen={setIsOpen}
          announcement={announcement}
          isEdit
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditAnnouncementBtn;
