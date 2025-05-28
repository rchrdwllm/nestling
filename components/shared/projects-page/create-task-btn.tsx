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
import CreateTaskForm from "./create-task-form";
import { useState } from "react";

type CreateTaskBtnProps = {
  projectId: string;
  availableAssignees: string;
};

const CreateTaskBtn = ({
  projectId,
  availableAssignees,
}: CreateTaskBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Add task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new task
          </DialogDescription>
        </DialogHeader>
        <CreateTaskForm
          availableAssignees={availableAssignees}
          projectId={projectId}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskBtn;
