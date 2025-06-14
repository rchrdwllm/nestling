import { Announcement } from "@/types";
import AnnouncementDetailsBtn from "./announcement-details-btn";
import { format, parseISO } from "date-fns";
import { getUserById } from "@/lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import DateDisplay from "@/components/ui/date-display";

type AnnouncementCardProps = { announcement: Announcement };

const AnnouncementCard = async ({ announcement }: AnnouncementCardProps) => {
  const { id, title, content, createdAt, isArchived, senderId } = announcement;
  const { success: sender, error: senderError } = await getUserById(senderId);

  if (senderError || !sender) {
    return <p>Error fetching sender information</p>;
  }
  return (
    <Dialog>
      <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex gap-4 relative">
        {sender.image ? (
          <Avatar className="size-10">
            <AvatarImage src={sender.image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                  {sender.name![0]}
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
            <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
              {sender.name![0]}
            </p>
          </div>
        )}
        <DialogTrigger asChild>
          <div className="cursor-pointer flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              <DateDisplay
                date={announcement.updatedAt}
                outputFormat="MMMM d, yyyy h:mm a"
              />
            </p>
            <p className="text-muted-foreground">{content}</p>
          </div>
        </DialogTrigger>
        <div className="absolute top-4 right-4">
          <AnnouncementDetailsBtn
            announcement={announcement}
            isArchived={isArchived}
            announcementId={id}
          />
        </div>
      </article>
      <DialogContent>
        <DialogTitle asChild>
          <div className="flex items-center gap-4">
            {sender.image ? (
              <Avatar className="size-10">
                <AvatarImage src={sender.image} className="object-cover" />
                <AvatarFallback>
                  <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                    <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                      {sender.name![0]}
                    </p>
                  </div>
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                  {sender.name![0]}
                </p>
              </div>
            )}
            <div>
              <h1 className="font-semibold">{sender.name}</h1>
              <p className="text-sm text-muted-foreground mb-2">
                Posted at{" "}
                <DateDisplay
                  date={announcement.updatedAt}
                  outputFormat="MMMM d, yyyy h:mm a"
                />
              </p>
            </div>
          </div>
        </DialogTitle>
        <DialogDescription asChild></DialogDescription>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p>{content}</p>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementCard;
