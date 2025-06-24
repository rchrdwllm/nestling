import { getUnreadNotifs } from "@/lib/notification";
import { getOptimisticUser } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import UnreadNotifsSection from "./unread-notifs-section";

const UnreadNotifs = async () => {
  const user = await getOptimisticUser();
  const {
    success: unreadNotifs,
    error: unreadNotifsError,
    lastDocId,
    hasMore,
  } = await getUnreadNotifs(user.id, 5);

  if (unreadNotifsError || !unreadNotifs) {
    return (
      <ErrorToast
        error={"Error fetching unread notifications: " + unreadNotifsError}
      />
    );
  }

  return (
    <UnreadNotifsSection
      notifications={unreadNotifs}
      lastDocId={lastDocId}
      hasMore={hasMore}
    />
  );
};

export default UnreadNotifs;
