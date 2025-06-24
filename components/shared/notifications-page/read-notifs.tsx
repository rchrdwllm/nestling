import { getReadNotifs } from "@/lib/notification";
import { getOptimisticUser } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import ReadNotifsSection from "./read-notifs-section";

const ReadNotifs = async () => {
  const user = await getOptimisticUser();
  const {
    success: readNotifs,
    error: readNotifsError,
    lastDocId,
    hasMore,
  } = await getReadNotifs(user.id, 5);

  if (readNotifsError || !readNotifs) {
    return (
      <ErrorToast
        error={"Error fetching read notifications: " + readNotifsError}
      />
    );
  }

  return (
    <ReadNotifsSection
      notifications={readNotifs}
      lastDocId={lastDocId}
      hasMore={hasMore}
    />
  );
};

export default ReadNotifs;
