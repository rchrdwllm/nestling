import CourseCard from "@/components/shared/courses-page/course-card";
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/ui/error-toast";
import { getSlicedInstructorCourses } from "@/lib/course";
import {
  getOptimisticUser,
  getUnarchivedInstructors,
  getUnarchivedStudents,
} from "@/lib/user";
import Link from "next/link";

const MyCourses = async () => {
  const user = await getOptimisticUser();
  const { success: courses, error } = await getSlicedInstructorCourses(
    user.id,
    4
  );
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();
  const { success: students, error: studentsError } =
    await getUnarchivedStudents();

  if (instructorsError || !instructors) {
    return (
      <ErrorToast error={"Error fetching instructors: " + instructorsError} />
    );
  }

  if (studentsError || !students) {
    return <ErrorToast error={"Error fetching students: " + studentsError} />;
  }

  if (error || !courses) {
    return <ErrorToast error={"Error fetching courses: " + error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">My courses</h1>
        <Link href="/courses">
          <Button variant="link" className="px-0">
            View all
          </Button>
        </Link>
      </div>
      <section className="gap-8 grid grid-cols-4">
        {!courses.length ? (
          <p className="text-muted-foreground">No courses found</p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              students={students}
              instructors={instructors}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default MyCourses;
