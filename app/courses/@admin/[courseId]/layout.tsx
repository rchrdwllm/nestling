import { ReactNode } from "react";
import CourseSectionLink from "@/components/shared/courses-page/course-section-link";
import { getCourse } from "@/lib/course";
import ErrorToast from "@/components/ui/error-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <main className="gap-x-2 grid grid-cols-8 bg-secondary">
      <ScrollArea className="col-span-2 h-[calc(100vh-1rem)] sidebar-scroll-area">
        <aside className="flex flex-col gap-2 col-span-2 bg-background shadow-sm p-6 border border-border rounded-xl h-full">
          <h1 className="font-medium text-sm">
            {course.courseCode} - {course.name}
          </h1>
          <CourseSectionLink href={`/courses/${courseId}`}>
            Modules
          </CourseSectionLink>
          <CourseSectionLink
            segments={["assignments"]}
            href={`/courses/${courseId}/assignments`}
          >
            Assignments
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
          <CourseSectionLink
            segments={["people"]}
            href={`/courses/${courseId}/people`}
          >
            People
          </CourseSectionLink>
          <CourseSectionLink
            segments={["archive"]}
            href={`/courses/${courseId}/archive`}
          >
            Archived Modules
          </CourseSectionLink>
          <CourseSectionLink
            segments={["discussions", "archive"]}
            href={`/courses/${courseId}/discussions/archive`}
          >
            Archived Discussions
          </CourseSectionLink>
          <CourseSectionLink
            segments={["announcements", "archive"]}
            href={`/courses/${courseId}/announcements/archive`}
          >
            Archived Announcements
          </CourseSectionLink>
          <CourseSectionLink
            segments={["grade"]}
            href={`/courses/${courseId}/grade`}
          >
            Grade
          </CourseSectionLink>
        </aside>
      </ScrollArea>
      <ScrollArea className="col-span-6 bg-background shadow-sm border border-border rounded-xl h-[calc(100vh-1rem)] overflow-y-auto">
        {children}
      </ScrollArea>
    </main>
  );
};

export default Layout;
