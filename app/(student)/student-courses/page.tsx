import AvailableCourses from "@/components/student-access/courses-page/available-courses";
import EnrolledCourses from "@/components/student-access/courses-page/enrolled-courses";

const CoursesPage = () => {
  return (
    <main className="p-6">
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      <AvailableCourses />
      {/* </Suspense> */}
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      <EnrolledCourses />
      {/* </Suspense> */}
    </main>
  );
};

export default CoursesPage;
