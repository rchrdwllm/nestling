import { getArchivedInstructorCourses } from "@/lib/course";
import { getCurrentUser } from "@/lib/user";
import CourseCard from "./course-card";
import ErrorToast from "@/components/ui/error-toast";

const ArchivedCourses = async () => {
  const user = await getCurrentUser();
  const { success: courses, error } = await getArchivedInstructorCourses(
    user!.id
  );

  if (error || !courses) {
    return <ErrorToast error={"Error fetching archived courses: " + error} />;
  }

  return (
    <section className="grid grid-cols-4 gap-8">
      {!courses.length ? (
        <p className="text-muted-foreground">No courses found</p>
      ) : (
        courses.map((course) => <CourseCard key={course.id} {...course} />)
      )}
    </section>
  );
};

export default ArchivedCourses;
