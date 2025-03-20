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

type CourseDetailsBtnProps = {
  course: string;
};

const CourseDetailsBtn = ({ course }: CourseDetailsBtnProps) => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseDetailsBtn;
