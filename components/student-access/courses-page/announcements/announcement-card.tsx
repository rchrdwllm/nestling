import { Announcement } from "@/types";

type AnnouncementCardProps = Announcement;

const AnnouncementCard = ({ title, content }: AnnouncementCardProps) => {
  return (
    <article className="p-4 rounded-xl border border-border flex flex-col gap-2">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{content}</p>
    </article>
  );
};

export default AnnouncementCard;
