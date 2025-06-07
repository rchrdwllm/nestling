import CreateDiscussionBtn from "@/components/shared/courses-page/discussions/create-discussion-btn";
import DiscussionCard from "@/components/shared/courses-page/discussions/discussion-card";
import ErrorToast from "@/components/ui/error-toast";
import { getDiscussionsByCourseId } from "@/lib/discussion";

const DiscussionsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { success: discussions, error } = await getDiscussionsByCourseId(
    courseId
  );

  if (error || !discussions) {
    return <ErrorToast error={"Error fetching discussions: " + error} />;
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Discussions</h1>
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
