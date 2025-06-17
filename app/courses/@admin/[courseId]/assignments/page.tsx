import AssignmentsTable from "@/components/shared/courses-page/assignments/assignments-table";
import { assignmentsTableDef } from "@/components/shared/courses-page/assignments/assignments-table-def";
import ErrorToast from "@/components/ui/error-toast";
import { getCourseAssignments } from "@/lib/content";
import Searcher from "@/components/shared/search/general-search/searcher";

const AssignmentsPage = async ({
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

  if (assignmentsError || !assignments) {
    return (
      <ErrorToast error={"Error fetching assignments: " + assignmentsError} />
    );
  }
  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">Assignments</h1>
        <hr />
      </div>
      <AssignmentsTable columns={assignmentsTableDef} data={assignments} />
    </div>
  );
};

export default AssignmentsPage;
