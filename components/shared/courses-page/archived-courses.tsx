import { getArchivedCourses, getArchivedInstructorCourses } from "@/lib/course";
import { getOptimisticUser } from "@/lib/user";
import CourseCard from "./course-card";
import ErrorToast from "@/components/ui/error-toast";

const ArchivedCourses = async () => {
  const user = await getOptimisticUser();
  const { success: courses, error } =
    user.role === "instructor"
      ? await getArchivedInstructorCourses(user.id)
      : await getArchivedCourses();

  if (error || !courses) {
    return <ErrorToast error={"Error fetching archived courses: " + error} />;
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

export default ArchivedCourses;
