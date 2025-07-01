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
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        {replyOwner.image ? (
          <Avatar className="size-10">
            <AvatarImage src={replyOwner.image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
                <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                  {replyOwner.name![0]}
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
            <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
              {replyOwner.name![0]}
            </p>
          </div>
        )}
        <div>
          <h1 className="font-semibold text-xl">{replyOwner.name} replied</h1>
          <p className="text-muted-foreground text-sm">
            Replied on{" "}
            <DateDisplay date={createdAt} outputFormat="MMMM d 'at' h:mm a" />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 ml-14">
        <p>{reply}</p>
      </div>
    </Card>
  );
};

export default TicketReplyCard;
