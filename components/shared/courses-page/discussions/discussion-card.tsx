import { Card } from "@/components/ui/card";
import DateDisplay from "@/components/ui/date-display";
import { getOptimisticUser } from "@/lib/user";
import { Discussion } from "@/types";
import Link from "next/link";
import DiscussionDetailsBtn from "./discussion-details-btn";

const DiscussionCard = async ({
  title,
  createdAt,
  id,
  courseId,
  userId,
}: Discussion) => {
  const user = await getOptimisticUser();
  const isOwner = userId === user.id;

  return (
    <Link href={`/courses/${courseId}/discussions/${id}`}>
      <Card className="flex flex-col gap-2 hover:shadow-md p-4 transition-shadow">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">{title}</h1>
          {(isOwner || user.role === "admin") && (
            <DiscussionDetailsBtn discussionId={id} />
          )}
        </div>
        <p className="text-muted-foreground">
          Posted at{" "}
          <DateDisplay date={createdAt} outputFormat="MMMM d, yyyy h:mm a" />
        </p>
      </Card>
    </Link>
  );
};

export default DiscussionCard;
