import CourseCard from "@/components/shared/courses-page/course-card";
import ErrorToast from "@/components/ui/error-toast";
import { getAllCourses } from "@/lib/course";
import { getAllInstructors } from "@/lib/user";

const Courses = async () => {
  const { success: courses, error } = await getAllCourses();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();

  if (error || !courses || !instructors || instructorsError) {
    return (
      <ErrorToast
        error={
          "Error fetching courses: " + error ||
          "Error fetching instructors: " + instructorsError
        }
      />
    );
  }

  return (
    <section className="grid grid-cols-4 gap-8">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
          isAdmin
          instructors={instructors}
        />
      ))}
    </section>
  );
};

export default Courses;
