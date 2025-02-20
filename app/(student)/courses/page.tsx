import AvailableCourses from "@/components/student-courses-page/available-courses";
import EnrolledCourses from "@/components/student-courses-page/enrolled-courses";

const CoursesPage = () => {
  return (
    <main>
      <AvailableCourses />
      <EnrolledCourses />
    </main>
  );
};

export default CoursesPage;
