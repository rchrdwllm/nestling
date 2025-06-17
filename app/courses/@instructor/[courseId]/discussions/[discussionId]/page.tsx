import DiscussionReplyBtn from "@/components/shared/courses-page/discussions/discussion-reply-btn";
import DiscussionReplyCard from "@/components/shared/courses-page/discussions/discussion-reply-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DateDisplay from "@/components/ui/date-display";
import ErrorToast from "@/components/ui/error-toast";
import { getDiscussionById } from "@/lib/discussion";
import { getDiscussionReplies } from "@/lib/discussion-reply";
import { getUserById } from "@/lib/user";
import Link from "next/link";
import Searcher from "@/components/shared/search/general-search/searcher";
import DiscussionDetailsBtn from "@/components/shared/courses-page/discussions/discussion-details-btn";

const DiscussionPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string; discussionId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { discussionId, courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: discussion, error } = await getDiscussionById(discussionId);

  if (error || !discussion) {
    return <ErrorToast error={"Error fetching discussion: " + error} />;
  }

  const { success: user, error: userError } = await getUserById(
    discussion.userId
  );

  if (userError || !user) {
    return <ErrorToast error={"Error fetching user: " + userError} />;
  }

  const { success: replies, error: repliesError } = await getDiscussionReplies(
    discussionId
  );

  if (repliesError || !replies) {
    return <ErrorToast error={"Error fetching replies: " + repliesError} />;
  }

  const isOwner = user.id === discussion.userId;

  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Discussion</h1>
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-4">
            {user.image ? (
              <Avatar className="size-10">
                <AvatarImage src={user.image} className="object-cover" />
                <AvatarFallback>
                  <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
                    <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                      {user.name![0]}
                    </p>
                  </div>
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
                <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                  {user.name![0]}
                </p>
              </div>
            )}
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl">{discussion.title}</h1>
                {(isOwner || user.role === "admin") && (
                  <DiscussionDetailsBtn discussionId={discussion.id} />
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                Posted on{" "}
                <DateDisplay
                  date={discussion.createdAt}
                  outputFormat="MMMM, d 'at' h:mm a"
                />{" "}
                by{" "}
                <span>
                  <Link href={`/profile?userId=${discussion.userId}`}>
                    <Button variant="link" className="px-0">
                      {user.name}
                    </Button>
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 ml-14">
            <div
              className="flex flex-col gap-4"
              dangerouslySetInnerHTML={{ __html: discussion.content }}
            />
          </div>
        </Card>
        {replies.map((reply) => (
          <DiscussionReplyCard key={reply.id} {...reply} />
        ))}
        <DiscussionReplyBtn discussionId={discussionId} courseId={courseId} />
      </section>
    </div>
  );
};

export default DiscussionPage;
