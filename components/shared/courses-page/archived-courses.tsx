import { getArchivedInstructorCourses } from "@/lib/course";
import { getCurrentUser } from "@/lib/user";
import CourseCard from "./course-card";

const ArchivedCourses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getArchivedInstructorCourses(
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
        <h1>No archived courses</h1>
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

export default ArchivedCourses;
