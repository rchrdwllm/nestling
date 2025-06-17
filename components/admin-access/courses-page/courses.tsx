import CourseCard from "@/components/shared/courses-page/course-card";
import ErrorToast from "@/components/ui/error-toast";
import { getAllCourses } from "@/lib/course";
import { getUnarchivedInstructors, getUnarchivedStudents } from "@/lib/user";

const Courses = async () => {
  const { success: courses, error } = await getAllCourses();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();
  const { success: students, error: studentsError } =
    await getUnarchivedStudents();

  if (
    error ||
    !courses ||
    !instructors ||
    instructorsError ||
    !students ||
    studentsError
  ) {
    return (
      <ErrorToast
        error={
          "Error fetching courses: " + error ||
          "Error fetching instructors: " + instructorsError ||
          "Error fetching students: " + studentsError
        }
      />
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
          />
        ))
      )}
    </section>
  );
};

export default Courses;
