import { getEnrolledCourses } from "@/lib/course";
import CourseCard from "./course-card/course-card";
import { getCurrentUser } from "@/lib/user";

const EnrolledCourses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getEnrolledCourses(user!.id);

  if (error) {
    return <p>{error}</p>;
  }

  if (!courses) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="grid grid-cols-4 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default EnrolledCourses;
