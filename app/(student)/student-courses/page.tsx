import AvailableCourses from "@/components/student-access/courses-page/available-courses";
import EnrolledCourses from "@/components/student-access/courses-page/enrolled-courses";
import { Suspense } from "react";

const CoursesPage = () => {
  return (
    <main className="p-6 flex flex-col gap-4">
      <h1 className="font-medium">Available Courses</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <AvailableCourses />
      </Suspense>
      <h1 className="font-medium">Enrolled Courses</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <EnrolledCourses />
      </Suspense>
    </main>
  );
};

export default CoursesPage;
