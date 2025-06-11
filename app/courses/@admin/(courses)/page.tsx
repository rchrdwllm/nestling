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
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Courses</h1>
            <CreateCourseBtn instructors={instructors} isAdmin />
          </div>
          <hr />
        </div>
        <Link href="/courses/archive">
          <Button variant="link">View archived courses</Button>
        </Link>
        <Courses />
      </div>
    </FadeInWrapper>
  );
};

export default AdminCoursesPage;
