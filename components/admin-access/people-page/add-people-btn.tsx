"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddPeopleForm from "./add-people-form";

const AddPeopleBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Register person
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register person</DialogTitle>
          <DialogDescription>
            Fill in the form below to register a new person
          </DialogDescription>
        </DialogHeader>
        <AddPeopleForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPeopleBtn;
