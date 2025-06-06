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
import ReplyTicketForm from "./reply-ticket-form";
import { useState } from "react";

type CreateReplyBtnProps = {
  ticketId: string;
};

const CreateReplyBtn = ({ ticketId }: CreateReplyBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          notAnimated
          variant="ghost"
          className="w-max text-muted-foreground"
        >
          <Plus className="size-4" /> Add reply
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add reply</DialogTitle>
          <DialogDescription>
            Add a reply to the ticket. You can include any relevant information
            or updates regarding the ticket.
          </DialogDescription>
        </DialogHeader>
        <ReplyTicketForm setIsOpen={setIsOpen} ticketId={ticketId} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateReplyBtn;
