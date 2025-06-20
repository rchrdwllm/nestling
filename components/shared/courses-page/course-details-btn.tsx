"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import EditCourseBtn from "./edit-course-btn";
import ArchiveCourseBtn from "./archive-course-btn";
import EditAccessBtn from "./edit-access-btn";
import { Course, User } from "@/types";
import AddUserBtn from "./add-user-btn";
import DuplicateCourseBtn from "./duplicate-course-btn";

type CourseDetailsBtnProps = {
  course: string;
  enrolledStudents: User[];
  isAdmin?: boolean;
  instructors?: User[];
  students?: User[];
  defaultInstructors?: User[];
};

const CourseDetailsBtn = ({
  course,
  enrolledStudents,
  isAdmin,
  instructors,
  defaultInstructors = [],
  students = [],
}: CourseDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <EditCourseBtn
            course={course}
            isAdmin={isAdmin}
            instructors={instructors}
            defaultInstructors={defaultInstructors}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AddUserBtn
            course={course}
            instructors={instructors || []}
            students={students}
            enrolledStudents={enrolledStudents}
            courseInstructors={defaultInstructors}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <EditAccessBtn course={course} enrolledStudents={enrolledStudents} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DuplicateCourseBtn courseId={(JSON.parse(course) as Course).id} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ArchiveCourseBtn course={course} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseDetailsBtn;
