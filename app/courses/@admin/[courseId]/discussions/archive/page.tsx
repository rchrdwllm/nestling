import DiscussionCard from "@/components/shared/courses-page/discussions/discussion-card";
import ErrorToast from "@/components/ui/error-toast";
import { getArchivedDiscussionsByCourseId } from "@/lib/discussion";

const ArchivedDiscussions = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: archivedDiscussions, error: archivedDiscussionsError } =
    await getArchivedDiscussionsByCourseId(courseId);

  if (archivedDiscussionsError || !archivedDiscussions) {
    return <ErrorToast error={archivedDiscussionsError} />;
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Archived discussions</h1>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        {!archivedDiscussions.length ? (
          <p className="text-muted-foreground">No archived discussions found</p>
        ) : (
          archivedDiscussions.map((discussion) => (
            <DiscussionCard key={discussion.id} {...discussion} />
          ))
        )}
      </section>
    </div>
  );
};

export default ArchivedDiscussions;
