import CourseCard from "@/components/shared/courses-page/course-card";
import { getAllCourses } from "@/lib/course";
import { getAllInstructors } from "@/lib/user";

const Courses = async () => {
  const { success: courses, error } = await getAllCourses();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();

  if (error || instructorsError) {
    return <div>Error fetching courses: {error || instructorsError}</div>;
  }

  if (!courses || !instructors) {
    return <h1>Loading...</h1>;
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
