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
import { useTasksTimelineStore } from "@/context/tasks-timeline-context";
import { User } from "@/types";

type CreateTaskDialogProps = {
  projectId: string;
  availableAssignees: User[];
};

const CreateTaskDialog = ({
  projectId,
  availableAssignees,
}: CreateTaskDialogProps) => {
  const { formToggled, setFormToggled, selectedEndDate, selectedStartDate } =
    useTasksTimelineStore();

  return (
    <Dialog open={formToggled} onOpenChange={setFormToggled}>
      <DialogTrigger asChild>{null}</DialogTrigger>
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
          setIsOpen={setFormToggled}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
