import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateCourseForm from "./create-course-form";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

type EditCourseBtnProps = {
  course: string;
  isAdmin?: boolean;
  instructors?: User[];
  defaultInstructors?: User[];
};

const EditCourseBtn = ({
  course,
  isAdmin,
  instructors,
  defaultInstructors,
}: EditCourseBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const courseData = JSON.parse(course);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-left block w-full px-2 py-1.5 font-normal"
        >
          Edit course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit course</DialogTitle>
          <DialogDescription>Edit course details below</DialogDescription>
        </DialogHeader>
        <CreateCourseForm
          isEdit
          isAdmin={isAdmin}
          setIsOpen={setIsOpen}
          instructors={instructors}
          defaultInstructors={defaultInstructors}
          course={{ ...courseData }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBtn;
