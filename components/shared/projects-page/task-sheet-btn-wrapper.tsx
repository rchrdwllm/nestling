import { Task, User } from "@/types";
import React from "react";
import TaskSheetBtn from "./task-sheet-btn";
import { getTaskAttachments } from "@/lib/task";

type TaskSheetBtnWrapperProps = {
  availableAssignees: User[];
  task: Task;
};

const TaskSheetBtnWrapper = async ({
  availableAssignees,
  task,
}: TaskSheetBtnWrapperProps) => {
  const { success, error } = await getTaskAttachments(task.id);

  if (error || !success) {
    console.error("Error fetching task attachments: ", error);
  }

  return (
    <TaskSheetBtn
      availableAssignees={availableAssignees}
      task={task}
      attachments={success}
    />
  );
};

export default TaskSheetBtnWrapper;
