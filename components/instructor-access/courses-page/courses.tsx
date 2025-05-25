import { getUnarchivedInstructorCourses } from "@/lib/course";
import { getCurrentUser } from "@/lib/user";
import CourseCard from "@/components/shared/courses-page/course-card";

const Courses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getUnarchivedInstructorCourses(
    user!.id
  );

  if (error)
    return (
      <div>
        <h1>Error fetching courses</h1>
      </div>
    );

  if (!courses) return <div>Loading...</div>;

  if (!courses.length) {
    return (
      <div>
        <h1>You have no courses</h1>
      </div>
    );
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
