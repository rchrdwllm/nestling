import { Button } from "@/components/ui/button";
import { getInstructorCourses } from "@/lib/course";
import { getCurrentUser } from "@/lib/user";
import Link from "next/link";

const InstructorCoursesPage = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getInstructorCourses(user!.id);

  if (error)
    return (
      <div>
        <h1>Error fetching courses</h1>
      </div>
    );

  if (!courses) return <div>Loading...</div>;

  return (
    <div>
      <h1>Your courses</h1>
      <Link href="/instructor-courses/create">
        <Button>New course</Button>
      </Link>
      {courses.map((course) => (
        <Link href={`/instructor-courses/${course.id}`} key={course.id}>
          <h2>{course.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default InstructorCoursesPage;
