import { getAllCourses } from "@/lib/course";
import CourseCard from "./course-card/course-card";

const AllCourses = async () => {
  const { success: courses, error } = await getAllCourses();

  if (error) {
    return <p>{error}</p>;
  }

  if (!courses) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>Available courses</h1>
      <div>
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default AllCourses;
