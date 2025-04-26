import { Announcement } from "@/types";
import AnnouncementDetailsBtn from "./announcement-details-btn";

type AnnouncementCardProps = Announcement;

const AnnouncementCard = ({
  id,
  title,
  content,
  isArchived,
}: AnnouncementCardProps) => {
  return (
    <article className="p-4 rounded-xl border border-border flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <AnnouncementDetailsBtn isArchived={isArchived} announcementId={id} />
      </div>
      <p className="text-muted-foreground">{content}</p>
    </article>
  );
};

export default AnnouncementCard;
