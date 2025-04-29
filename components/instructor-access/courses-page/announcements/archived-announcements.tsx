import { getArchivedCourseAnnouncements } from "@/lib/announcement";
import AnnouncementCard from "./announcement-card";

type ArchivedAnnouncementsProps = {
  courseId: string;
};

const ArchivedAnnouncements = async ({
  courseId,
}: ArchivedAnnouncementsProps) => {
  const { success: announcements, error } =
    await getArchivedCourseAnnouncements(courseId);

  if (error) {
    return <section>Error fetching announcements</section>;
  }

  if (!announcements) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex flex-col gap-4">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={JSON.stringify(announcement)}
          {...announcement}
        />
      ))}
    </section>
  );
};

export default ArchivedAnnouncements;
