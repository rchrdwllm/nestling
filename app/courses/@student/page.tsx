import AvailableCourses from "@/components/student-access/courses-page/available-courses";
import EnrolledCourses from "@/components/student-access/courses-page/enrolled-courses";

const CoursesPage = () => {
  return (
    <main className="p-6 flex flex-col gap-4">
      <h1 className="font-medium">Available Courses</h1>
      <AvailableCourses />
      <h1 className="font-medium">Enrolled Courses</h1>
      <EnrolledCourses />
    </main>
  );
};

export default CoursesPage;
