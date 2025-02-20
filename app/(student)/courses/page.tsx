import AllCourses from "@/components/student-courses-page/all-courses";
import EnrolledCourses from "@/components/student-courses-page/enrolled-courses";

const CoursesPage = () => {
  return (
    <main>
      <AllCourses />
      <EnrolledCourses />
    </main>
  );
};

export default CoursesPage;
