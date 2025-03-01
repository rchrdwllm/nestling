import CourseCard from "@/components/instructor-access/courses-page/course-card";
import CreateCourseBtn from "@/components/instructor-access/courses-page/create-course-btn";
import { getInstructorCourses } from "@/lib/course";
import { getCurrentUser } from "@/lib/user";

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
    <div className="p-6 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Manage courses</h1>
          <CreateCourseBtn />
        </div>
        <hr />
      </div>
      <section className="grid grid-cols-4 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </section>
    </div>
  );
};

export default InstructorCoursesPage;
