import CreateDiscussionBtn from "@/components/shared/courses-page/discussions/create-discussion-btn";
import DiscussionCard from "@/components/shared/courses-page/discussions/discussion-card";
import ErrorToast from "@/components/ui/error-toast";
import { getDiscussionsByCourseId } from "@/lib/discussion";
import Searcher from "@/components/shared/search/general-search/searcher";

const DiscussionsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: discussions, error } = await getDiscussionsByCourseId(
    courseId
  );

  if (error || !discussions) {
    return <ErrorToast error={"Error fetching discussions: " + error} />;
  }
  return (
    <div className="flex flex-col gap-6 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Discussions</h1>
          <CreateDiscussionBtn courseId={courseId} />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        {discussions.map((discussion) => (
          <DiscussionCard key={discussion.id} {...discussion} />
        ))}
      </section>
    </div>
  );
};

export default DiscussionsPage;
