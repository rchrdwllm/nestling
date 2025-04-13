"use client";

import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, User } from "@/types";

type SearchResultsProps = {
  results: {
    students: User[];
    courses: Course[];
  };
};

const SearchResults = ({ results }: SearchResultsProps) => {
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
      className="absolute h-96 bg-card w-full mt-2 shadow-sm border border-border rounded-md p-4"
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
          {results.students.length > 0 ? (
            <ul>
              {results.students.map((student: User) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          ) : (
            <p>No students found</p>
          )}
        </TabsContent>
        <TabsContent value="courses">
          {results.courses.length > 0 ? (
            <ul>
              {results.courses.map((course: Course) => (
                <li key={course.id}>{course.name}</li>
              ))}
            </ul>
          ) : (
            <p>No courses found</p>
          )}
        </TabsContent>
        <TabsContent value="projects">
          {/* TODO: Projects search */}
          <p>To do: Projects</p>
        </TabsContent>
      </Tabs>
    </MotionWrapper>
  );
};

export default SearchResults;
