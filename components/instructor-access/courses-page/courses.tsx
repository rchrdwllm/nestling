"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/shared/courses-page/course-card";
import ErrorToast from "@/components/ui/error-toast";
import { getPaginatedInstructorCourses } from "@/lib/course";
import { Course, User } from "@/types";
import { Button } from "@/components/ui/button";

interface CoursesProps {
  initialCourses: Course[];
  initialLastVisibleDocId?: string;
  initialInstructors: User[];
  initialStudents: User[];
  hasMore: boolean;
  userId: string;
}

const Courses = ({
  initialCourses,
  initialLastVisibleDocId,
  initialInstructors,
  initialStudents,
  hasMore,
  userId,
}: CoursesProps) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [lastVisibleDocId, setLastVisibleDocId] = useState<string | undefined>(
    initialLastVisibleDocId
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentHasMore, setCurrentHasMore] = useState(hasMore);

  const fetchMoreCourses = async () => {
    setLoading(true);
    try {
      const {
        success: fetchedCourses,
        lastVisible,
        error: coursesError,
      } = await getPaginatedInstructorCourses(userId, 8, lastVisibleDocId);

      if (coursesError) {
        setError("Error fetching more courses: " + coursesError);
        return;
      }

      setCourses((prevCourses) => [...prevCourses, ...(fetchedCourses || [])]);
      setLastVisibleDocId(lastVisible);
      setCurrentHasMore(
        (fetchedCourses && fetchedCourses.length === 8) || false
      );
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  if (error) {
    return <ErrorToast error={error} />;
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="gap-8 grid grid-cols-4">
        {!courses.length && !loading ? (
          <p className="text-muted-foreground">No courses found</p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              instructors={initialInstructors}
              students={initialStudents}
            />
          ))
        )}
      </div>
      {currentHasMore && (
        <Button
          variant="ghost"
          className="mx-auto w-max"
          onClick={fetchMoreCourses}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </section>
  );
};

export default Courses;
