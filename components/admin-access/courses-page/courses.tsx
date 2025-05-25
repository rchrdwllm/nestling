import CourseCard from "@/components/instructor-access/courses-page/course-card";
import { getAllCourses } from "@/lib/course";

const Courses = async () => {
  const { success: courses, error } = await getAllCourses();

  if (error) {
    return <div>Error fetching courses: {error}</div>;
  }

  if (!courses) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="grid grid-cols-4 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </section>
  );
};

export default Courses;
