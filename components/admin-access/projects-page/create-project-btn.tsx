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
import CreateProjectForm from "./create-project-form";

type CreateProjectBtnProps = {
  admins: string;
  instructors: string;
};

const CreateProjectBtn = ({ admins, instructors }: CreateProjectBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <Plus className="size-4" />
          New project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new project
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm
          admins={admins}
          instructors={instructors}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectBtn;
