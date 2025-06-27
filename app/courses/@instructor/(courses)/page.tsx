import Courses from "@/components/instructor-access/courses-page/courses";
import CreateCourseBtn from "@/components/shared/courses-page/create-course-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";
import { getOptimisticUser, getUnarchivedInstructors, getUnarchivedStudents } from "@/lib/user";
import { getPaginatedInstructorCourses } from "@/lib/course";
import Unauthorized from "@/components/ui/unauthorized";
import ErrorToast from "@/components/ui/error-toast";

const InstructorCoursesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "instructor") return <Unauthorized />;

  const { success: instructors, error: instructorsError } = await getUnarchivedInstructors();
  const { success: students, error: studentsError } = await getUnarchivedStudents();
  const { success: initialCourses, lastVisible: initialLastVisibleDocId, error: coursesError } = await getPaginatedInstructorCourses(user.id, 8);

  if (instructorsError || !instructors) {
    return (
      <ErrorToast error={"Error fetching instructors: " + (instructorsError || "")} />
    );
  }

  if (studentsError || !students) {
    return (
      <ErrorToast error={"Error fetching students: " + (studentsError || "")} />
    );
  }

  if (coursesError || !initialCourses) {
    return (
      <ErrorToast error={"Error fetching courses: " + (coursesError || "")} />
    );
  }

  const hasMore = initialCourses.length === 8;

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-10 p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-1 justify-between items-center gap-4">
            <h1 className="flex-1 font-semibold text-3xl">Manage courses</h1>
            <Link href="/courses/archive">
              <Button variant="outline">View archive</Button>
            </Link>
            <CreateCourseBtn instructors={instructors} />
          </div>
          <hr />
        </div>
        <Courses
          initialCourses={initialCourses}
          initialLastVisibleDocId={initialLastVisibleDocId}
          initialInstructors={instructors}
          initialStudents={students}
          hasMore={hasMore}
          userId={user.id}
        />
      </div>
    </FadeInWrapper>
  );
};

export default InstructorCoursesPage;
