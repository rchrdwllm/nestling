"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation";
import CourseSectionLink from "@/components/shared/courses-page/course-section-link";

const Layout = ({ children }: { children: ReactNode }) => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <section className="grid grid-cols-10 gap-x-2">
      <aside className="p-6 flex flex-col gap-2 col-span-2">
        <CourseSectionLink href={`/courses/${courseId}`}>
          Modules
        </CourseSectionLink>
        <CourseSectionLink
          segments={["archive"]}
          href={`/courses/${courseId}/archive`}
        >
          Archived Modules
        </CourseSectionLink>
        <CourseSectionLink
          segments={["announcements"]}
          href={`/courses/${courseId}/announcements`}
        >
          Announcements
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
      <div className="col-span-8">{children}</div>
    </section>
  );
};

export default Layout;
