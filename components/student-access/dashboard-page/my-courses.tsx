import { Button } from "@/components/ui/button";
import { getSlicedCourses } from "@/lib/course";
import { getOptimisticUser } from "@/lib/user";
import Link from "next/link";
import CourseCard from "../courses-page/course-card/course-card";
import ErrorToast from "@/components/ui/error-toast";

const MyCourses = async () => {
  const user = await getOptimisticUser();
  const { success: courses, error } = await getSlicedCourses(user.id, 4);

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
        {!courses.length ? (
          <p className="text-muted-foreground">No courses found</p>
        ) : (
          courses.map((course) => <CourseCard key={course.id} {...course} />)
        )}
      </section>
    </div>
  );
};

export default MyCourses;
