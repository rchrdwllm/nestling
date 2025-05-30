"use client";

import { Task } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CreateTaskForm from "./create-task-form";
import { useState } from "react";

type TaskSheetBtnProps = {
  task: Task;
  availableAssignees: string;
};

const TaskSheetBtn = ({ task, availableAssignees }: TaskSheetBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="link" className="px-0 text-foreground">
          {task.title}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>{task.title}</SheetTitle>
          <CreateTaskForm
            availableAssignees={availableAssignees}
            projectId={task.projectId}
            setIsOpen={setIsOpen}
            isEdit
            task={task}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TaskSheetBtn;
