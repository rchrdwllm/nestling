import { getCourseAnnouncements } from "@/lib/announcement";
import AnnouncementCard from "./announcement-card";

type AnnouncementsProps = {
  courseId: string;
};

const Announcements = async ({ courseId }: AnnouncementsProps) => {
  const { success: announcements, error } = await getCourseAnnouncements(
    courseId
  );

  if (error) {
    return <section>Error fetching announcements</section>;
  }

  if (!announcements) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex flex-col gap-4">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} {...announcement} />
      ))}
    </section>
  );
};

export default Announcements;
