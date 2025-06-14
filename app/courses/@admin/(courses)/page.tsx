import Courses from "@/components/admin-access/courses-page/courses";
import CreateCourseBtn from "@/components/shared/courses-page/create-course-btn";
import ErrorToast from "@/components/ui/error-toast";
import { getUnarchivedInstructors } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminCoursesPage = async () => {
  const { success: instructors, error } = await getUnarchivedInstructors();

  if (error || !instructors) {
    return (
      <ErrorToast error={"Error fetching instructors: " + (error || "")} />
    );
  }

  return (
    <FadeInWrapper>
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
        <Courses />
      </div>
    </FadeInWrapper>
  );
};

export default AdminCoursesPage;
