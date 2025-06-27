"use client";

import { useEffect, useState } from "react";
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
import {
  getCourse,
  getCourseInstructors,
  getEnrolledStudents,
} from "@/lib/course";
import ErrorToast from "@/components/ui/error-toast";

type CourseDetailsBtnProps = {
  courseId: string;
  isAdmin?: boolean;
  instructors?: User[];
  students?: User[];
};

const CourseDetailsBtn = ({
  courseId,
  isAdmin,
  instructors,
  students,
}: CourseDetailsBtnProps) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<User[]>([]);
  const [courseInstructors, setCourseInstructors] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && !course) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const { success: fetchedCourse, error: courseError } =
            await getCourse(courseId);
          const {
            success: fetchedEnrolledStudents,
            error: enrolledStudentsError,
          } = await getEnrolledStudents(courseId);
          const {
            success: fetchedCourseInstructors,
            error: courseInstructorsError,
          } = await getCourseInstructors(courseId);

          if (courseError || enrolledStudentsError || courseInstructorsError) {
            setError(
              courseError ||
                enrolledStudentsError ||
                courseInstructorsError ||
                "Unknown error"
            );
            return;
          }

          setCourse(fetchedCourse || null);
          setEnrolledStudents(fetchedEnrolledStudents || []);
          setCourseInstructors(fetchedCourseInstructors || []);
        } catch (err: any) {
          setError(err.message || "An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [open, courseId, course]);

  if (error) {
    return <ErrorToast error={error} />;
  }

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {loading && <DropdownMenuItem>Loading...</DropdownMenuItem>}
        {!loading && course && (
          <>
            <DropdownMenuItem asChild>
              <EditCourseBtn
                course={JSON.stringify(course)}
                isAdmin={isAdmin}
                instructors={instructors}
                defaultInstructors={courseInstructors}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AddUserBtn
                course={JSON.stringify(course)}
                instructors={instructors || []}
                students={students || []}
                enrolledStudents={enrolledStudents}
                courseInstructors={courseInstructors}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditAccessBtn
                course={JSON.stringify(course)}
                enrolledStudents={enrolledStudents}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DuplicateCourseBtn courseId={course.id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ArchiveCourseBtn course={JSON.stringify(course)} />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseDetailsBtn;
