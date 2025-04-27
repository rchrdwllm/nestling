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

type CourseDetailsBtnProps = {
  course: string;
  enrolledStudents: string;
};

const CourseDetailsBtn = ({
  course,
  enrolledStudents,
}: CourseDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <EditCourseBtn course={course} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ArchiveCourseBtn course={course} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <EditAccessBtn course={course} enrolledStudents={enrolledStudents} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseDetailsBtn;
