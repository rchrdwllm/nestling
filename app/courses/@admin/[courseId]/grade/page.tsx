import GenerateGradesReport from "@/components/shared/courses-page/grading/generate-grades-report";
import GradeStudentCard from "@/components/shared/courses-page/grading/grade-student-card";
import ErrorToast from "@/components/ui/error-toast";
import { getCourseAssignments } from "@/lib/content";
import { getCourse, getEnrolledStudents } from "@/lib/course";
import { generateGradesReport } from "@/lib/report";
import Searcher from "@/components/shared/search/general-search/searcher";

const GradePage = async ({
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
  const { success: enrolledStudents, error: enrolledStudentsError } =
    await getEnrolledStudents(courseId);
  const { success: course, error: courseError } = await getCourse(courseId);

  if (assignmentsError || !assignments) {
    return (
      <ErrorToast error={"Error fetching assignments: " + assignmentsError} />
    );
  }

  if (enrolledStudentsError || !enrolledStudents) {
    return (
      <ErrorToast
        error={"Error fetching enrolled students: " + enrolledStudentsError}
      />
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
          <h1 className="font-semibold text-3xl">Grade assignments</h1>
          <GenerateGradesReport
            studentIds={enrolledStudents.map((student) => student.id)}
            courseId={courseId}
            courseCode={course.courseCode}
            courseTitle={course.name}
          />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        {!enrolledStudents.length ? (
          <p className="text-muted-foreground">No students found</p>
        ) : (
          enrolledStudents.map((student) => (
            <GradeStudentCard
              key={student.id}
              {...student}
              assignments={assignments}
              courseId={courseId}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default GradePage;
