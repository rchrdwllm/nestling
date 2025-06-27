import Courses from "@/components/admin-access/courses-page/courses";
import CreateCourseBtn from "@/components/shared/courses-page/create-course-btn";
import ErrorToast from "@/components/ui/error-toast";
import { getOptimisticUser, getUnarchivedInstructors, getUnarchivedStudents } from "@/lib/user";
import { getPaginatedCourses } from "@/lib/course";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Searcher from "@/components/shared/search/general-search/searcher";
import Unauthorized from "@/components/ui/unauthorized";

const AdminCoursesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "admin") return <Unauthorized />;

  const { success: instructors, error: instructorsError } = await getUnarchivedInstructors();
  const { success: students, error: studentsError } = await getUnarchivedStudents();
  const { success: initialCourses, lastVisible: initialLastVisibleDocId, error: coursesError } = await getPaginatedCourses(8);

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

  const hasMore = initialCourses.length === 3;

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
            <CreateCourseBtn instructors={instructors} isAdmin />
          </div>
          <hr />
        </div>
        <Courses
          initialCourses={initialCourses}
          initialLastVisibleDocId={initialLastVisibleDocId}
          initialInstructors={instructors}
          initialStudents={students}
          hasMore={hasMore}
        />
      </div>
    </FadeInWrapper>
  );
};

export default AdminCoursesPage;
