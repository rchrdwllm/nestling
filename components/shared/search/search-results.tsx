"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentSearchResults from "./student-search-results";
import CoursesSearchResults from "./courses-search-results";
import InstructorSearchResults from "./instructor-search-results";
import { memo, useMemo } from "react";
import ContentsSearchResults from "./contents-search-results";
import ProjectsSearchResults from "./projects-search-results";
import { useCurrentUser } from "@/hooks/use-current-user";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";

type SearchResultsProps = {
  isInbox?: boolean;
};

const SearchResults = memo(({ isInbox = false }: SearchResultsProps) => {
  const { user } = useCurrentUser();
  const entities = useMemo(() => {
    if (isInbox) {
      return ["students", "instructors"];
    }

    switch (user.role) {
      case "student":
        return ["students", "instructors", "courses", "contents"];
      case "instructor":
        return ["students", "instructors", "courses", "contents", "projects"];
      case "admin":
        return ["students", "instructors", "courses", "contents", "projects"];
      default:
        return ["students", "instructors", "courses", "contents"];
    }
  }, [user]);

  if (isInbox) {
    return (
      <MotionWrapper
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 10,
        }}
        className="z-10 absolute bg-card shadow-sm mt-2 p-4 border border-border rounded-md w-full"
      >
        <ScrollArea className="h-72">
          <Tabs defaultValue={entities[0]} className="w-full">
            <TabsList className="w-full">
              {entities.includes("students") && (
                <TabsTrigger className="w-full" value="students">
                  Students
                </TabsTrigger>
              )}
              {entities.includes("instructors") && (
                <TabsTrigger className="w-full" value="instructors">
                  Instructors
                </TabsTrigger>
              )}
              {entities.includes("courses") && (
                <TabsTrigger className="w-full" value="courses">
                  Courses
                </TabsTrigger>
              )}
              {entities.includes("contents") && (
                <TabsTrigger className="w-full" value="contents">
                  Contents
                </TabsTrigger>
              )}
              {entities.includes("projects") && (
                <TabsTrigger className="w-full" value="projects">
                  Projects
                </TabsTrigger>
              )}
            </TabsList>
            {entities.includes("students") && (
              <TabsContent value="students">
                <StudentSearchResults isInbox={isInbox} />
              </TabsContent>
            )}
            {entities.includes("instructors") && (
              <TabsContent value="instructors">
                <InstructorSearchResults isInbox={isInbox} />
              </TabsContent>
            )}
            {entities.includes("courses") && (
              <TabsContent value="courses">
                <CoursesSearchResults />
              </TabsContent>
            )}
            {entities.includes("contents") && (
              <TabsContent value="contents">
                <ContentsSearchResults />
              </TabsContent>
            )}
            {entities.includes("projects") && (
              <TabsContent value="projects">
                <ProjectsSearchResults />
              </TabsContent>
            )}
          </Tabs>
        </ScrollArea>
      </MotionWrapper>
    );
  }

  return (
    <div className="h-80">
      <Tabs defaultValue={entities[0]} className="w-full">
        <TabsList className="w-full">
          {entities.includes("students") && (
            <TabsTrigger className="w-full" value="students">
              Students
            </TabsTrigger>
          )}
          {entities.includes("instructors") && (
            <TabsTrigger className="w-full" value="instructors">
              Instructors
            </TabsTrigger>
          )}
          {entities.includes("courses") && (
            <TabsTrigger className="w-full" value="courses">
              Courses
            </TabsTrigger>
          )}
          {entities.includes("contents") && (
            <TabsTrigger className="w-full" value="contents">
              Contents
            </TabsTrigger>
          )}
          {entities.includes("projects") && (
            <TabsTrigger className="w-full" value="projects">
              Projects
            </TabsTrigger>
          )}
        </TabsList>
        {entities.includes("students") && (
          <TabsContent value="students">
            <StudentSearchResults isInbox={isInbox} />
          </TabsContent>
        )}
        {entities.includes("instructors") && (
          <TabsContent value="instructors">
            <InstructorSearchResults isInbox={isInbox} />
          </TabsContent>
        )}
        {entities.includes("courses") && (
          <TabsContent value="courses">
            <CoursesSearchResults />
          </TabsContent>
        )}
        {entities.includes("contents") && (
          <TabsContent value="contents">
            <ContentsSearchResults />
          </TabsContent>
        )}
        {entities.includes("projects") && (
          <TabsContent value="projects">
            <ProjectsSearchResults />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
});

export default SearchResults;
