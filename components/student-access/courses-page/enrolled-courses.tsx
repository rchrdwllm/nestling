import { getEnrolledCourses } from "@/lib/course";
import CourseCard from "./course-card/course-card";
import { getCurrentUser } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";

const EnrolledCourses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getEnrolledCourses(user!.id);

  if (error || !courses) {
    return <ErrorToast error={"Error fetching enrolled courses: " + error} />;
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
