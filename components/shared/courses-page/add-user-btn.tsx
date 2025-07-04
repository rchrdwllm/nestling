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
import AddUserForm from "@/components/admin-access/courses-page/add-user-form";

type AddUserBtnProps = {
  course: string;
  students: User[];
  instructors: User[];
  enrolledStudents: User[];
  courseInstructors: User[];
};

const AddUserBtn = ({
  course,
  students,
  instructors,
  enrolledStudents,
  courseInstructors,
}: AddUserBtnProps) => {
  const courseData = JSON.parse(course) as Course;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="block px-2 py-1.5 w-full font-normal text-sm text-left"
        >
          Add users
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
          courseId={courseData.id}
          students={students}
          instructors={instructors}
          enrolledStudents={enrolledStudents}
          courseInstructors={courseInstructors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserBtn;
