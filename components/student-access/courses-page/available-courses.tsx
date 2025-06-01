import { getAvailableCourses } from "@/lib/course";
import CourseCard from "./course-card/course-card";
import { getCurrentUser } from "@/lib/user";
import CoursesTable from "./courses-table";
import { coursesCols } from "./courses-table-def";

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
      <CoursesTable columns={coursesCols} data={courses} />
    </section>
  );
};

export default AvailableCourses;
