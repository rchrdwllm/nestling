import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DateDisplay from "@/components/ui/date-display";
import ErrorToast from "@/components/ui/error-toast";
import { getUserById } from "@/lib/user";
import { DiscussionReply } from "@/types";
import Link from "next/link";
import React from "react";

const DiscussionReplyCard = async ({
  userId,
  content,
  createdAt,
}: DiscussionReply) => {
  const { success: user, error: userError } = await getUserById(userId);

  if (userError || !user) {
    return <ErrorToast error={"Error fetching user: " + userError} />;
  }

  return (
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
          <Link href={`/profile?userId=${user.id}`}>
            <Button className="px-0 text-foreground" variant="link">
              <h1 className="font-medium">{user.name}</h1>
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Replied on{" "}
            <DateDisplay date={createdAt} outputFormat="MMMM, d 'at' h:mm a" />
          </p>
        </div>
      </div>
      <div className="ml-14 flex flex-col gap-4">
        <div
          className="flex flex-col gap-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Card>
  );
};

export default DiscussionReplyCard;
