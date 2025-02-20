import { getStudentCourses } from "@/lib/course";

const EnrolledCourses = async () => {
  const { success: studentCourses, error: studentCoursesError } =
    await getStudentCourses();

  return <div>EnrolledCourses</div>;
};

export default EnrolledCourses;
