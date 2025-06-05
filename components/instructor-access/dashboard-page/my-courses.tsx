import CourseCard from "@/components/shared/courses-page/course-card";
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/ui/error-toast";
import { getSlicedInstructorCourses } from "@/lib/course";
import { getOptimisticUser } from "@/lib/user";
import Link from "next/link";

const MyCourses = async () => {
  const user = await getOptimisticUser();
  const { success: courses, error } = await getSlicedInstructorCourses(
    user.id,
    4
  );

  if (error || !courses) {
    return <ErrorToast error={"Error fetching courses: " + error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My courses</h1>
        <Link href="/courses">
          <Button variant="link" className="px-0">
            View all
          </Button>
        </Link>
      </div>
      <section className="grid grid-cols-4 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </section>
    </div>
  );
};

export default MyCourses;
