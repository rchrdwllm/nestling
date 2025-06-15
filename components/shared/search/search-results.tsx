"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentSearchResults from "./student-search-results";
import CoursesSearchResults from "./courses-search-results";
import InstructorSearchResults from "./instructor-search-results";
import { memo, useMemo } from "react";
import ContentsSearchResults from "./contents-search-results";
import ProjectsSearchResults from "./projects-search-results";
import { useCurrentUser } from "@/hooks/use-current-user";

type SearchResultsProps = {
  isInbox?: boolean;
};

const SearchResults = memo(({ isInbox = false }: SearchResultsProps) => {
  const { user } = useCurrentUser();
  const entities = useMemo(() => {
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
