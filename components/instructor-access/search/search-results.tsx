"use client";

import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentSearchResults from "./student-search-results";
import { Suspense } from "react";
import CoursesSearchResults from "./courses-search-results";

const SearchResults = () => {
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
      className="absolute w-full min-h-96 bg-card mt-2 shadow-sm border border-border rounded-md p-4"
    >
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="students">
            Students
          </TabsTrigger>
          <TabsTrigger className="w-full" value="courses">
            Courses
          </TabsTrigger>
          <TabsTrigger className="w-full" value="projects">
            Projects
          </TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <StudentSearchResults />
        </TabsContent>
        <TabsContent value="courses">
          <CoursesSearchResults />
        </TabsContent>
        <TabsContent value="projects">
          <p>To do: Projects</p>
        </TabsContent>
      </Tabs>
    </MotionWrapper>
  );
};

export default SearchResults;
