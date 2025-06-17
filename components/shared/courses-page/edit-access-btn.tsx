import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Course, User } from "@/types";
import EditAccessForm from "./edit-access-form";

type EditAccessBtnProps = {
  course: string;
  enrolledStudents: User[];
};

const EditAccessBtn = ({ course, enrolledStudents }: EditAccessBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const courseData = JSON.parse(course) as Course;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="block px-2 py-1.5 w-full font-normal text-sm text-left"
        >
          Edit access
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit course access</DialogTitle>
          <DialogDescription>
            Edit course access details below
          </DialogDescription>
        </DialogHeader>
        <EditAccessForm
          courseId={courseData.id}
          enrolledStudents={enrolledStudents}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditAccessBtn;
