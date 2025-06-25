import CourseCard from "@/components/shared/courses-page/course-card";
import ErrorToast from "@/components/ui/error-toast";
import { getAllCoursesWithSubcollections } from "@/lib/course";
import { getUnarchivedInstructors, getUnarchivedStudents } from "@/lib/user";

const Courses = async () => {
  const {
    success: courses,
    enrolledStudentsByCourse,
    courseInstructorsByCourse,
    error: coursesError,
  } = await getAllCoursesWithSubcollections();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();
  const { success: students, error: studentsError } =
    await getUnarchivedStudents();

  if (
    coursesError ||
    !courses ||
    !instructors ||
    instructorsError ||
    !students ||
    studentsError
  ) {
    return (
      <ErrorToast error={"Error fetching courses, instructors, or students."} />
    );
  }

  return (
    <section className="gap-8 grid grid-cols-4">
      {!courses.length ? (
        <p className="text-muted-foreground">No courses found</p>
      ) : (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            isAdmin
            instructors={instructors}
            students={students}
            enrolledStudents={enrolledStudentsByCourse[course.id] || []}
            courseInstructors={courseInstructorsByCourse[course.id] || []}
          />
        ))
      )}
    </section>
  );
};

export default Courses;
