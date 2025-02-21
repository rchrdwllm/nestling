import { getAvailableCourses } from "@/lib/course";
import CourseCard from "./course-card/course-card";
import { getCurrentUser } from "@/lib/user";

const AvailableCourses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getAvailableCourses(user!.id);

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

export default AvailableCourses;
