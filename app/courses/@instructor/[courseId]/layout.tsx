import { ReactNode } from "react";
import { getCourse } from "@/lib/course";
import ErrorToast from "@/components/ui/error-toast";
import InstructorCourseLayout from "@/components/shared/courses-page/layout/instructor-course-layout";
import { getOptimisticUser } from "@/lib/user";
import Unauthorized from "@/components/ui/unauthorized";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseId: string };
}) => {
  const { courseId } = await params;
  const user = await getOptimisticUser();

  if (user.role !== "instructor") return <Unauthorized />;

  const { success: course, error: courseError } = await getCourse(courseId);

  if (courseError || !course) {
    return <ErrorToast error={"Error fetching course: " + courseError} />;
  }

  return (
    <InstructorCourseLayout
      courseCode={course.courseCode}
      name={course.name}
      id={course.id}
    >
      {children}
    </InstructorCourseLayout>
  );
};

export default Layout;
