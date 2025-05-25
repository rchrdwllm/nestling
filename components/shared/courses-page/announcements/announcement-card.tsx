import { Announcement } from "@/types";
import AnnouncementDetailsBtn from "./announcement-details-btn";
import { format } from "date-fns";

type AnnouncementCardProps = {
  announcement: string;
};

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const { id, title, content, isArchived, createdAt } = JSON.parse(
    announcement,
  ) as Announcement;

  return (
    <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <AnnouncementDetailsBtn
          announcement={JSON.parse(announcement)}
          isArchived={isArchived}
          announcementId={id}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {format(new Date(createdAt), "LLLL dd, y p")}
      </p>
      <p className="text-muted-foreground">{content}</p>
    </article>
  );
};

export default AnnouncementCard;
