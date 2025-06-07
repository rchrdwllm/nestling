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
import CreateTicketForm from "@/components/shared/help-page/create-ticket-form";
import { useState } from "react";
import { Plus } from "lucide-react";

const CreateTicketBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button notAnimated>
          <Plus className="size-4" /> Create ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a ticket!</DialogTitle>
          <DialogDescription>
            Tell us your concerns and we will get back to you soon.
          </DialogDescription>
        </DialogHeader>
        <CreateTicketForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTicketBtn;
