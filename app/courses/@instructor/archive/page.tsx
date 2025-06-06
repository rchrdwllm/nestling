import ArchivedCourses from "@/components/shared/courses-page/archived-courses";
import { Suspense } from "react";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const ArchivedCoursesPage = () => {
  return (
    <FadeInWrapper className="p-6 flex flex-col gap-10">
      <main >
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Archived Courses</h1>
          <hr />
        </div>
        <ArchivedCourses />
      </main>
    </FadeInWrapper>
  );
};

export default ArchivedCoursesPage;
