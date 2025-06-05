import { getArchivedCourseAnnouncements } from "@/lib/announcement";
import AnnouncementCard from "./announcement-card";
import ErrorToast from "@/components/ui/error-toast";

type ArchivedAnnouncementsProps = {
  courseId: string;
};

const ArchivedAnnouncements = async ({
  courseId,
}: ArchivedAnnouncementsProps) => {
  const { success: announcements, error } =
    await getArchivedCourseAnnouncements(courseId);

  if (error || !announcements) {
    return (
      <ErrorToast
        error={"Error fetching archived announcements: " + (error || "")}
      />
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          {...announcement}
        />
      ))}
    </section>
  );
};

export default ArchivedAnnouncements;
