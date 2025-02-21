import { getEnrolledCourses } from "@/lib/course";
import CourseCard from "./course-card/course-card";

const EnrolledCourses = async () => {
  const { success: courses, error } = await getEnrolledCourses();

  if (error) {
    return <p>{error}</p>;
  }

  if (!courses) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>Enrolled courses</h1>
      <div>
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default EnrolledCourses;
