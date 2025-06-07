import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import AvailableCourses from "@/components/student-access/courses-page/available-courses";
import EnrolledCourses from "@/components/student-access/courses-page/enrolled-courses";

const CoursesPage = () => {
  return (
    <FadeInWrapper>
      <main className="p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Courses</h1>
          <hr />
        </div>
        <h1 className="text-xl font-semibold">Enrolled Courses</h1>
        <EnrolledCourses />
        <h1 className="text-xl font-semibold">Available Courses</h1>
        <AvailableCourses />
      </main>
    </FadeInWrapper>
  );
};

export default CoursesPage;
