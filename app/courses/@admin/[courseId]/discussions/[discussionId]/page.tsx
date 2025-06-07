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

const DiscussionPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; discussionId: string }>;
}) => {
  const { discussionId, courseId } = await params;
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

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Discussion</h1>
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              <Avatar className="size-10">
                <AvatarImage src={user.image} className="object-cover" />
                <AvatarFallback>
                  <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                    <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                      {user.name![0]}
                    </p>
                  </div>
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                  {user.name![0]}
                </p>
              </div>
            )}
            <div>
              <h1 className="text-xl font-semibold">{discussion.title}</h1>
              <p className="text-sm text-muted-foreground">
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
          <div className="ml-14 flex flex-col gap-4">
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
