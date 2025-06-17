import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DateDisplay from "@/components/ui/date-display";
import ErrorToast from "@/components/ui/error-toast";
import { getUserById } from "@/lib/user";
import { DiscussionReply } from "@/types";
import Link from "next/link";
import React from "react";
import ReplyDetailsBtn from "./reply-details-btn";

const DiscussionReplyCard = async ({
  userId,
  content,
  createdAt,
  id,
}: DiscussionReply) => {
  const { success: user, error: userError } = await getUserById(userId);

  if (userError || !user) {
    return <ErrorToast error={"Error fetching user: " + userError} />;
  }

  const isOwner = user.id === userId;

  return (
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
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <Link href={`/profile?userId=${user.id}`}>
              <Button className="px-0 text-foreground" variant="link">
                <h1 className="font-medium">{user.name}</h1>
              </Button>
            </Link>
            {(isOwner || user.role === "admin") && (
              <ReplyDetailsBtn replyId={id} />
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            Replied on{" "}
            <DateDisplay
              date={createdAt}
              outputFormat="MMMM d, yyyy 'at' h:mm a"
            />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 ml-14">
        <div
          className="flex flex-col gap-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Card>
  );
};

export default DiscussionReplyCard;
