import { getEnrolledCourses } from "@/lib/course";
import { getCurrentUser } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import EnrolledCourseCard from "./enrolled-course-card";

const EnrolledCourses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getEnrolledCourses(user!.id);

  if (error || !courses) {
    return <ErrorToast error={"Error fetching enrolled courses: " + error} />;
  }

  return (
    <section>
      <div className="gap-8 grid grid-cols-4">
        {!courses.length ? (
          <p className="text-muted-foreground">No courses found</p>
        ) : (
          courses.map((course) => (
            <EnrolledCourseCard key={course.id} {...course} />
          ))
        )}
      </div>
    </section>
  );
};

export default EnrolledCourses;
