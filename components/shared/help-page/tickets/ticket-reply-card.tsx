import { TicketReply } from "@/types";
import { Card } from "@/components/ui/card";
import ErrorToast from "@/components/ui/error-toast";
import { getUserById } from "@/lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DateDisplay from "@/components/ui/date-display";

const TicketReplyCard = async ({ userId, createdAt, reply }: TicketReply) => {
  const { success: replyOwner, error: replyOwnerError } = await getUserById(
    userId
  );

  if (replyOwnerError || !replyOwner) {
    return (
      <ErrorToast error={"Failed to load reply owner: " + replyOwnerError} />
    );
  }

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {replyOwner.image ? (
          <Avatar className="size-10">
            <AvatarImage src={replyOwner.image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                  {replyOwner.name![0]}
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
            <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
              {replyOwner.name![0]}
            </p>
          </div>
        )}
        <div>
          <h1 className="text-xl font-semibold">{replyOwner.name} replied</h1>
          <p className="text-sm text-muted-foreground">
            Replied on{" "}
            <DateDisplay date={createdAt} outputFormat="MMMM, d 'at' h:mm a" />
          </p>
        </div>
      </div>
      <div className="ml-14 flex flex-col gap-4">
        <p>{reply}</p>
      </div>
    </Card>
  );
};

export default TicketReplyCard;
