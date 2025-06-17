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
import { User } from "@/types";
import AddUserForm from "./add-user-form";

type AddUserBtnProps = {
  courseId: string;
  enrolledStudents: User[];
  courseInstructors: User[];
  students: User[];
  instructors: User[];
};

const AddUserBtn = ({
  courseId,
  students,
  instructors,
  courseInstructors,
  enrolledStudents,
}: AddUserBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Add user
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add users to this course</DialogTitle>
          <DialogDescription>
            Select users to add to this course. You can add students and
            instructors.
          </DialogDescription>
        </DialogHeader>
        <AddUserForm
          setIsOpen={setIsOpen}
          courseId={courseId}
          students={students}
          instructors={instructors}
          courseInstructors={courseInstructors}
          enrolledStudents={enrolledStudents}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserBtn;
