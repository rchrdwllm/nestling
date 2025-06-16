import DiscussionCard from "@/components/shared/courses-page/discussions/discussion-card";
import ErrorToast from "@/components/ui/error-toast";
import { getArchivedDiscussionsByCourseId } from "@/lib/discussion";
import Searcher from "@/components/shared/search/general-search/searcher";

const ArchivedDiscussions = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: archivedDiscussions, error: archivedDiscussionsError } =
    await getArchivedDiscussionsByCourseId(courseId);

  if (archivedDiscussionsError || !archivedDiscussions) {
    return <ErrorToast error={archivedDiscussionsError} />;
  }
  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">Archived discussions</h1>
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
