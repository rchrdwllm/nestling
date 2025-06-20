import { getAvailableCourses } from "@/lib/course";
import { getCurrentUser } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import CourseCard from "./course-card";

const AvailableCourses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getAvailableCourses(user!.id);

  if (error || !courses) {
    return <ErrorToast error={"Error fetching available courses: " + error} />;
  }

  return (
    <section className="gap-8 grid grid-cols-4">
      {!courses.length ? (
        <p className="text-muted-foreground">No courses found</p>
      ) : (
        courses.map((course) => <CourseCard key={course.id} {...course} />)
      )}
    </section>
  );
};

export default AvailableCourses;
