import { ReactNode } from "react";
import CourseSectionLink from "@/components/shared/courses-page/course-section-link";
import ErrorToast from "@/components/ui/error-toast";
import { getCourse } from "@/lib/course";

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
    <section className="grid grid-cols-10 gap-x-2">
      <aside className="p-6 flex flex-col gap-2 col-span-2">
        <h1 className="font-medium text-sm">
          {course.courseCode} - {course.name}
        </h1>
        <CourseSectionLink href={`/courses/${courseId}`}>
          Modules
        </CourseSectionLink>
        <CourseSectionLink
          segments={["discussions"]}
          href={`/courses/${courseId}/discussions`}
        >
          Discussions
        </CourseSectionLink>
        <CourseSectionLink
          segments={["announcements"]}
          href={`/courses/${courseId}/announcements`}
        >
          Announcements
        </CourseSectionLink>
      </aside>
      <div className="col-span-8">{children}</div>
    </section>
  );
};

export default Layout;
