"use client";

import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentSearchResults from "./student-search-results";
import CoursesSearchResults from "./courses-search-results";
import InstructorSearchResults from "./instructor-search-results";
import { memo } from "react";
import ContentsSearchResults from "./contents-search-results";
import ProjectsSearchResults from "./projects-search-results";

type SearchResultsProps = {
  isInbox?: boolean;
  entities?: string[];
};

const SearchResults = memo(
  ({
    entities = ["students", "instructors", "courses", "projects"],
    isInbox = false,
  }: SearchResultsProps) => {
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
        className="absolute w-full min-h-96 bg-card z-10 mt-2 shadow-sm border border-border rounded-md p-4"
      >
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
      </MotionWrapper>
    );
  }
);

export default SearchResults;
