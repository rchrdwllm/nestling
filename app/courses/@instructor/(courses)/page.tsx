import Courses from "@/components/instructor-access/courses-page/courses";
import CreateCourseBtn from "@/components/shared/courses-page/create-course-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const InstructorCoursesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-10 p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-1 justify-between items-center gap-4">
            <h1 className="font-semibold text-3xl">Manage courses</h1>
            <Link href="/courses/archive">
              <Button variant="outline">View archive</Button>
            </Link>
            <CreateCourseBtn />
          </div>
          <hr />
        </div>
        <Courses />
      </div>
    </FadeInWrapper>
  );
};

export default InstructorCoursesPage;
