import { getOptimisticUser } from "@/lib/user";
import { getAllAnnouncements } from "@/lib/announcement";
import AnnouncementCard from "../courses-page/announcements/announcement-card";
import ErrorToast from "@/components/ui/error-toast";

const RecentAnnouncements = async () => {
  const user = await getOptimisticUser();
  const { success: announcements, error } = await getAllAnnouncements(
    user.id,
    5
  );

  if (error || !announcements) {
    return <ErrorToast error={"Error fetching announcements: " + error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Recent announcements</h1>
      </div>
      <section className="flex flex-col gap-4">
        {announcements.map((announcement) => (
          <AnnouncementCard
            showCourseTitle
            key={announcement.id}
            announcement={announcement}
          />
        ))}
      </section>
    </div>
  );
};

export default RecentAnnouncements;
