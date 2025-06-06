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
import CreateTicketForm from "./create-ticket-form";
import { useState } from "react";

const CreateTicketBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" notAnimated>
          Need further help? Create a ticket
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
