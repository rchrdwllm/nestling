import { getCourseAnnouncements } from "@/lib/announcement";
import AnnouncementCard from "./announcement-card";
import ErrorToast from "@/components/ui/error-toast";

type AnnouncementsProps = {
  courseId: string;
};

const Announcements = async ({ courseId }: AnnouncementsProps) => {
  const { success: announcements, error } = await getCourseAnnouncements(
    courseId
  );

  if (error || !announcements) {
    return <ErrorToast error={"Error fetching announcements: " + error} />;
  }

  return (
    <section className="flex flex-col gap-4">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </section>
  );
};

export default Announcements;
