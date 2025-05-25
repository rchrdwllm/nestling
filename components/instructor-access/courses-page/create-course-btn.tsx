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
import CreateCourseForm from "./create-course-form";
import { useState } from "react";
import { User } from "@/types";

type CreateCourseBtnProps = {
  isAdmin?: boolean;
  instructors?: User[];
};

const CreateCourseBtn = ({ isAdmin, instructors }: CreateCourseBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          New course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create course</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new course
          </DialogDescription>
        </DialogHeader>
        <CreateCourseForm
          setIsOpen={setIsOpen}
          isAdmin={isAdmin}
          instructors={instructors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseBtn;
