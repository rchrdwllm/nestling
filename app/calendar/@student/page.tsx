import FullCalendar from "@/components/ui/full-calendar";
import { getUpcomingAssignmentsForStudent } from "@/lib/content";
import { getOptimisticUser } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import ErrorToast from "@/components/ui/error-toast";
import Searcher from "@/components/shared/search/general-search/searcher";
import Unauthorized from "@/components/ui/unauthorized";

const StudentCalendarPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "student") return <Unauthorized />;

  const { success: upcomingAssignments, error } =
    await getUpcomingAssignmentsForStudent(user.id);

  if (error || !upcomingAssignments) {
    return (
      <ErrorToast error={"Failed to fetch upcoming assignments: " + error} />
    );
  }

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <FullCalendar
        events={
          upcomingAssignments.map((assignment) => ({
            id: assignment.id,
            start: new Date(assignment.startDate!),
            end: new Date(assignment.endDate!),
            title: assignment.title,
            url: `/courses/${assignment.courseId}/modules/content/${assignment.id}`,
            courseId: assignment.courseId,
            type: "assignment",
          })) || []
        }
      />
    </FadeInWrapper>
  );
};

export default StudentCalendarPage;
