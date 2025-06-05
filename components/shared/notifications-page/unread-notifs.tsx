import { getUnreadNotifs } from "@/lib/notification";
import { getOptimisticUser } from "@/lib/user";
import NotifCard from "./notif-card";
import ErrorToast from "@/components/ui/error-toast";

const UnreadNotifs = async () => {
  const user = await getOptimisticUser();
  const { success: unreadNotifs, error: unreadNotifsError } =
    await getUnreadNotifs(user.id);

  if (unreadNotifsError || !unreadNotifs) {
    return (
      <ErrorToast
        error={"Error fetching unread notifications: " + unreadNotifsError}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!unreadNotifs.length ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">No notifications</p>
        </div>
      ) : (
        unreadNotifs.map((notif) => <NotifCard key={notif.id} {...notif} />)
      )}
    </div>
  );
};

export default UnreadNotifs;
