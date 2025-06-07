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
import { Plus } from "lucide-react";
import CreateDiscussionForm from "./create-discussion-form";
import { useState } from "react";

type CreateDiscussionBtnProps = {
  courseId: string;
};

const CreateDiscussionBtn = ({ courseId }: CreateDiscussionBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button notAnimated>
          <Plus className="size-4" /> New discussion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create discussion</DialogTitle>
          <DialogDescription>
            Start a new discussion by providing a title and content. This will
            help others to engage and contribute to the conversation.
          </DialogDescription>
        </DialogHeader>
        <CreateDiscussionForm courseId={courseId} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiscussionBtn;
