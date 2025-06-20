import ErrorToast from "@/components/ui/error-toast";
import { getCourseAssignments } from "@/lib/content";
import { getCourse } from "@/lib/course";
import Searcher from "@/components/shared/search/general-search/searcher";
import StudentAssignmentCard from "@/components/student-access/courses-page/grades/student-assignment-card";
import GenerateGradesReport from "@/components/student-access/courses-page/grades/generate-grades-report";
import { getOptimisticUser } from "@/lib/user";

const GradesPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: assignments, error: assignmentsError } =
    await getCourseAssignments(courseId);
  const { success: course, error: courseError } = await getCourse(courseId);
  const user = await getOptimisticUser();

  if (assignmentsError || !assignments) {
    return (
      <ErrorToast error={"Error fetching assignments: " + assignmentsError} />
    );
  }

  if (courseError || !course) {
    return (
      <ErrorToast error={"Error fetching course information: " + courseError} />
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Your grades</h1>
          <GenerateGradesReport
            studentId={user.id}
            courseId={courseId}
            courseCode={course.courseCode}
            courseTitle={course.name}
          />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <h1 className="font-semibold text-xl">Assignments</h1>
        {!assignments.length ? (
          <p className="py-12 text-muted-foreground text-center">
            No assignments yet
          </p>
        ) : (
          assignments.map((assignment) => (
            <StudentAssignmentCard key={assignment.id} {...assignment} />
          ))
        )}
      </section>
    </div>
  );
};

export default GradesPage;
