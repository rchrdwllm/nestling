import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import AvailableCourses from "@/components/student-access/courses-page/available-courses";
import EnrolledCourses from "@/components/student-access/courses-page/enrolled-courses";
import Searcher from "@/components/shared/search/general-search/searcher";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CoursesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <main className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-3xl">Courses</h1>
          <hr />
        </div>
        <h1 className="font-semibold text-xl">Enrolled Courses</h1>
        <EnrolledCourses />
        <h1 className="font-semibold text-xl">Available Courses</h1>
        <div className="flex justify-between items-center">
          <Input placeholder="Search courses" className="max-w-md" />
          <div className="flex gap-4">
            <Button variant="outline">
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button variant="outline">
              Next <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
        <AvailableCourses />
      </main>
    </FadeInWrapper>
  );
};

export default CoursesPage;
