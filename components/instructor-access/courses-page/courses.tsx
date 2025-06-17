import { getUnarchivedInstructorCourses } from "@/lib/course";
import {
  getCurrentUser,
  getUnarchivedInstructors,
  getUnarchivedStudents,
} from "@/lib/user";
import CourseCard from "@/components/shared/courses-page/course-card";
import ErrorToast from "@/components/ui/error-toast";

const Courses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getUnarchivedInstructorCourses(
    user!.id
  );
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();
  const { success: students, error: studentsError } =
    await getUnarchivedStudents();

  if (error || !courses) {
    return <ErrorToast error={"Error fetching courses: " + error} />;
  }

  if (!courses.length) {
    return (
      <div>
        <h1>You have no courses</h1>
      </div>
    );
  }

  if (instructorsError || !instructors) {
    return (
      <ErrorToast error={"Error fetching instructors: " + instructorsError} />
    );
  }

  if (studentsError || !students) {
    return <ErrorToast error={"Error fetching students: " + studentsError} />;
  }

  return (
    <section className="gap-8 grid grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          students={students}
          instructors={instructors}
          {...course}
        />
      ))}
    </section>
  );
};

export default Courses;
