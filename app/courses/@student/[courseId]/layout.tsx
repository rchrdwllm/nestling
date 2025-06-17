import { ReactNode } from "react";
import ErrorToast from "@/components/ui/error-toast";
import { getCourse } from "@/lib/course";
import StudentCourseLayout from "@/components/shared/courses-page/layout/student-course-layout";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseId: string };
}) => {
  const { courseId } = await params;
  const { success: course, error: courseError } = await getCourse(courseId);

  if (courseError || !course) {
    return <ErrorToast error={"Error fetching course: " + courseError} />;
  }

  return (
    <StudentCourseLayout
      courseCode={course.courseCode}
      name={course.name}
      id={course.id}
    >
      {children}
    </StudentCourseLayout>
  );
};

export default Layout;
