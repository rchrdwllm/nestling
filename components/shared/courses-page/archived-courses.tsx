import { getArchivedCourses, getArchivedInstructorCourses } from "@/lib/course";
import {
  getOptimisticUser,
  getUnarchivedInstructors,
  getUnarchivedStudents,
} from "@/lib/user";
import CourseCard from "./course-card";
import ErrorToast from "@/components/ui/error-toast";

const ArchivedCourses = async () => {
  const user = await getOptimisticUser();
  const { success: courses, error } =
    user.role === "instructor"
      ? await getArchivedInstructorCourses(user.id)
      : await getArchivedCourses();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();
  const { success: students, error: studentsError } =
    await getUnarchivedStudents();

  if (error || !courses) {
    return <ErrorToast error={"Error fetching archived courses: " + error} />;
  }

  if (studentsError || !students) {
    return <ErrorToast error={"Error fetching students: " + studentsError} />;
  }

  if (instructorsError || !instructors) {
    return (
      <ErrorToast error={"Error fetching instructors: " + instructorsError} />
    );
  }

  return (
    <section className="gap-8 grid grid-cols-4">
      {!courses.length ? (
        <p className="text-muted-foreground">No courses found</p>
      ) : (
        courses.map((course) => (
          <CourseCard
            instructors={instructors}
            students={students}
            key={course.id}
            {...course}
          />
        ))
      )}
    </section>
  );
};

export default ArchivedCourses;
