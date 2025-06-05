import { getReadNotifs } from "@/lib/notification";
import { getOptimisticUser } from "@/lib/user";
import NotifCard from "./notif-card";
import ErrorToast from "@/components/ui/error-toast";

const ReadNotifs = async () => {
  const user = await getOptimisticUser();
  const { success: readNotifs, error: readNotifsError } = await getReadNotifs(
    user.id
  );

  if (readNotifsError || !readNotifs) {
    return (
      <ErrorToast
        error={"Error fetching read notifications: " + readNotifsError}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!readNotifs.length ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">No notifications</p>
        </div>
      ) : (
        readNotifs.map((notif) => <NotifCard key={notif.id} {...notif} />)
      )}
    </div>
  );
};

export default ReadNotifs;
