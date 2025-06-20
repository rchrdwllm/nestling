"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import CourseSectionLink from "../course-section-link";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CourseLayoutProps = {
  courseCode: string;
  name: string;
  id: string;
  children: ReactNode;
};

const InstructorCourseLayout = ({
  courseCode,
  name,
  id,
  children,
}: CourseLayoutProps) => {
  const [isToggled, setIsToggled] = useState(true);
  const router = useRouter();

  return (
    <main className="gap-x-2 grid grid-cols-8 bg-secondary">
      {isToggled && (
        <ScrollArea className="col-span-2 h-[calc(100vh-1rem)] sidebar-scroll-area">
          <aside className="flex flex-col gap-2 col-span-2 bg-background shadow-sm p-6 border border-border rounded-xl h-full">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-2 px-2 text-muted-foreground"
                onClick={() => router.back()}
              >
                <ArrowLeft className="size-4" />
              </Button>
              <h1 className="max-w-xs font-medium text-sm truncate">
                {courseCode} - {name}
              </h1>
            </div>
            <CourseSectionLink href={`/courses/${id}`}>
              Modules
            </CourseSectionLink>
            <CourseSectionLink
              segments={["assignments"]}
              href={`/courses/${id}/assignments`}
            >
              Assignments
            </CourseSectionLink>
            <CourseSectionLink
              segments={["discussions"]}
              href={`/courses/${id}/discussions`}
            >
              Discussions
            </CourseSectionLink>
            <CourseSectionLink
              segments={["announcements"]}
              href={`/courses/${id}/announcements`}
            >
              Announcements
            </CourseSectionLink>
            <CourseSectionLink
              segments={["people"]}
              href={`/courses/${id}/people`}
            >
              People
            </CourseSectionLink>
            <CourseSectionLink
              segments={["archive"]}
              href={`/courses/${id}/archive`}
            >
              Archived Modules
            </CourseSectionLink>
            <CourseSectionLink
              segments={["discussions", "archive"]}
              href={`/courses/${id}/discussions/archive`}
            >
              Archived Discussions
            </CourseSectionLink>
            <CourseSectionLink
              segments={["announcements", "archive"]}
              href={`/courses/${id}/announcements/archive`}
            >
              Archived Announcements
            </CourseSectionLink>
            <CourseSectionLink
              segments={["grade"]}
              href={`/courses/${id}/grade`}
            >
              Grade
            </CourseSectionLink>
          </aside>
        </ScrollArea>
      )}
      <ScrollArea
        className={cn(
          "flex flex-col gap-2 col-span-6 bg-background shadow-sm border border-border rounded-xl h-[calc(100vh-1rem)] scroll-area",
          isToggled ? "col-span-6" : "col-span-8"
        )}
      >
        <div className="px-3 pt-6">
          <Button
            size="sm"
            className="text-muted-foreground"
            variant="ghost"
            onClick={() => setIsToggled(!isToggled)}
          >
            <PanelLeft />
          </Button>
        </div>
        {children}
      </ScrollArea>
    </main>
  );
};

export default InstructorCourseLayout;
