import { getUnreadNotifs } from "@/lib/notification";
import { getOptimisticUser } from "@/lib/user";
import NotifCard from "./notif-card";

const UnreadNotifs = async () => {
  const user = await getOptimisticUser();
  const { success: unreadNotifs, error: unreadNotifsError } =
    await getUnreadNotifs(user.id);

  if (unreadNotifsError || !unreadNotifs) {
    console.error("Error fetching unread notifications:", unreadNotifsError);

    return <div>Error loading notifications, please try again later.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {unreadNotifs.map((notif) => (
        <NotifCard key={notif.id} {...notif} />
      ))}
    </div>
  );
};

export default UnreadNotifs;
